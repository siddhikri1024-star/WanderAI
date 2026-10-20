# Manual Test Cases

Record your actual results before submitting. Do not mark tests as passed unless you ran them.

| ID | Scenario | Steps | Expected result | Actual result |
|---|---|---|---|---|
| TC-01 | Landing page | Open the local site | Header, hero and destination section render without console errors | [Record] |
| TC-02 | Search by destination | Search for `Kyoto` | Kyoto card remains visible | [Record] |
| TC-03 | Search no match | Search for an unlikely string | Empty state and clear-filters action appear | [Record] |
| TC-04 | Category filter | Select `Nature` | Only Nature category cards appear | [Record] |
| TC-05 | Clear filters | Use clear-filters from empty state | Search and category reset | [Record] |
| TC-06 | Favourite | Heart a destination, reload page | Favourite remains saved | [Record] |
| TC-07 | Remove favourite | Remove a saved destination | It disappears from saved list and heart state resets | [Record] |
| TC-08 | Planner modal | Open and close planner | Modal opens; close button and backdrop close it | [Record] |
| TC-09 | Demo itinerary | Stop API or leave AI key unset and submit planner | A labelled sample itinerary appears | [Record] |
| TC-10 | Save itinerary | Generate a plan and select Save itinerary | Saved itinerary appears in library after closing/reloading page | [Record] |
| TC-11 | Export itinerary | Export a plan | A text file downloads with day sections and tips | [Record] |
| TC-12 | Delete saved plan | Delete a saved itinerary | Plan disappears from library | [Record] |
| TC-13 | API empty destination | POST an empty destination | HTTP 400 response | [Record] |
| TC-14 | API duration bound | POST days `99` | HTTP 400 response | [Record] |
| TC-15 | API traveller bound | POST travelers `0` | HTTP 400 response | [Record] |
| TC-16 | API health | Open `/api/health` | JSON reports process status and AI configuration flag | [Record] |
| TC-17 | Responsive layout | Inspect at desktop, tablet and mobile widths | No horizontal overflow; content remains usable | [Record] |
| TC-18 | Keyboard access | Navigate with Tab and activate controls | Focus is visible and controls are operable | [Record] |
| TC-19 | Production build | Run `npm run build` | Vite completes build without errors | [Record] |

## Test environment record
- Date: [Fill in]
- OS: [Fill in]
- Browser/version: [Fill in]
- Node.js version: [Fill in]
- Git commit / build version: [Fill in]
- Screenshots or logs: [Attach]
