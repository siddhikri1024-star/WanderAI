# Software Requirements Specification (SRS)

## 1. Purpose
Define the functional and non-functional requirements for WanderAI, a browser-based travel discovery and itinerary-planning application.

## 2. User class
A traveller who wants destination inspiration and a draft itinerary. No account is required in this version.

## 3. Functional requirements

- **FR-01 Destination discovery:** The system shall display curated destination cards.
- **FR-02 Search:** The system shall filter destinations by name, country and category text.
- **FR-03 Category filtering:** The system shall allow one category filter at a time and provide a way to clear filters.
- **FR-04 Favourites:** The user shall be able to save and remove destination favourites.
- **FR-05 Persistence:** Favourites shall persist in browser local storage between reloads on the same browser profile.
- **FR-06 Preference input:** The planner shall accept destination, duration, budget, group size, travel style and interests.
- **FR-07 Plan generation:** The client shall request a plan from `POST /api/plan` when the API is available.
- **FR-08 Demo fallback:** If the API is unavailable or AI is not configured, the interface shall provide a visibly labelled sample itinerary.
- **FR-09 Itinerary storage:** The user shall be able to save generated plans locally, reopen them and delete them.
- **FR-10 Export:** The user shall be able to export a plan as a `.txt` file and copy structured JSON when clipboard access is available.
- **FR-11 Input validation:** The server shall reject an empty/overlong destination, duration outside 1–14 days and traveller count outside 1–10.
- **FR-12 API key protection:** The AI key shall be read from server environment configuration and not exposed in client bundles.

## 4. Non-functional requirements

- **NFR-01 Responsive design:** Layout shall adapt to common desktop, tablet and mobile widths.
- **NFR-02 Accessibility:** Interactive elements shall have meaningful labels or visible text; keyboard focus shall be visible.
- **NFR-03 Motion preference:** Reduced-motion preferences shall be respected by CSS.
- **NFR-04 Resilience:** A missing AI key or unreachable API shall not prevent the destination catalogue from being explored.
- **NFR-05 Security:** Request body size shall be limited; server input bounds shall be validated; secrets shall remain server-side.
- **NFR-06 Maintainability:** Frontend and API code shall be organised in separate source areas and setup documented.
- **NFR-07 Honest status:** Demo content shall not be labelled as a live AI result, and the product shall not claim live booking or price confirmation.

## 5. External interfaces

- Browser UI: HTML, CSS and React-rendered controls.
- Backend: HTTP JSON endpoint at `/api/plan`.
- AI provider: optional server-to-server API call.
- Browser storage: `localStorage` for favourites and saved itineraries.

## 6. Constraints and assumptions

- Node.js 18+ is installed for local development.
- Live AI requires a valid provider key and network access.
- Browser storage is local to a browser profile and is not a backup mechanism.
- Destination prices and ratings are illustrative catalogue content and should be verified before being used as factual travel advice.
