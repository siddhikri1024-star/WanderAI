# Viva Preparation — WanderAI

## Project overview

**Q1. What problem does your project solve?**  
It brings destination discovery and preference-based itinerary ideation into one interface, reducing the need to start from a blank page. It is not a booking platform.

**Q2. Why did you choose React?**  
React supports component-based UI development and state-driven rendering. Search results, filters, modal state and saved-plan views can update without manually rebuilding the page.

**Q3. What is Vite used for?**  
Vite provides the development server and production bundling for the React application.

**Q4. Explain the architecture.**  
The React frontend collects preferences and calls the Express endpoint. The server validates inputs and optionally calls the AI provider using a server-side key. If that path is unavailable, the client can present a labelled demo itinerary. Browser local storage holds favourites and saved itineraries.

## React and browser concepts

**Q5. What is `useState`?**  
A React Hook for storing component state and triggering a re-render when state changes.

**Q6. Why use `useMemo` for filtering?**  
It memoizes the filtered destination list until its dependencies change. For a catalogue this small, it is not essential, but it demonstrates dependency-based derived data.

**Q7. What is `localStorage`?**  
A browser key/value store that persists strings for the same origin. The application serializes arrays/objects as JSON. It is not encrypted storage or cross-device sync.

**Q8. What happens if local storage contains invalid JSON?**  
The initial state uses a `try/catch` and falls back to an empty array.

**Q9. Why is a `.txt` export useful?**  
It lets the user keep an offline copy or share a draft without needing an account or backend database.

## API and AI

**Q10. Why use Express?**  
Express provides a simple HTTP server for the health endpoint and itinerary generation route.

**Q11. Why must the API key stay on the server?**  
Frontend variables are bundled and visible to users. A secret placed in client code could be extracted and abused. The backend reads the key from environment configuration.

**Q12. What is CORS?**  
Cross-Origin Resource Sharing is a browser security mechanism controlling which web origins may read responses from an API. The project allows configured origins through `CLIENT_ORIGIN`.

**Q13. How do you handle AI failure?**  
The API returns an error response, while the frontend falls back to a clearly labelled sample itinerary so the rest of the product remains demoable.

**Q14. Is the itinerary factually guaranteed?**  
No. Generated content is an idea, not verified live travel information. Users must confirm prices, opening times, safety guidance, visa rules and bookings from authoritative sources.

**Q15. Why request JSON output from the model?**  
Structured output makes the result easier for the UI to render as days, activities and tips instead of parsing free-form prose.

## Validation, testing and future work

**Q16. What server-side validation is implemented?**  
Destination must be present and no longer than 120 characters; trip duration must be an integer from 1 to 14; traveller count must be an integer from 1 to 10. Request body size is also limited.

**Q17. What are the current limitations?**  
No authentication, database, live bookings, real-time maps or weather. Local data stays in one browser. AI availability depends on an external provider and credentials.

**Q18. How would you improve it next?**  
Add authentication and a database, integrate a mapping provider and live weather with source timestamps, add unit/API tests and CI, and conduct accessibility/usability testing.

**Q19. What is the difference between a unit test and an integration test?**  
A unit test checks a small unit in isolation. An integration test checks whether multiple units or services work together, such as the frontend calling the API.

**Q20. What should you show during the demo?**  
Search/filter destinations, save a favourite, generate a demo itinerary, save it, export it, reload the page to show local persistence, then explain the optional AI setup and the limitations.
