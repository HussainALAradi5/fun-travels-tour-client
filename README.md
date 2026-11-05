# Fun Travels Tour - Client

Web frontend for the Fun Travels Tour travel agency management platform.

**Author:** Hussain Al Aradi
**Tech:** React 19 | TypeScript | Next.js 16 | Chakra UI v3

## Application Showcase

The screenshots below highlight the public travel experience and the authenticated administration workspace using populated development data.

### Public Experience

#### Home

![Fun Travels public home page](docs/images/showcase-home.png)

#### Tour Catalog

![Fun Travels tour catalog](docs/images/showcase-tours.png)

#### Sign In

![Fun Travels sign-in page](docs/images/showcase-login.png)

### Account Experience

#### Administrator Profile

![Fun Travels administrator profile](docs/images/showcase-profile.png)

### Administration Workspace

#### Tour Inventory

![Fun Travels tour inventory management](docs/images/showcase-admin-tours.png)

#### Customer Requests

![Fun Travels customer request management](docs/images/showcase-admin-requests.png)

#### Transaction Ledger

![Fun Travels transaction ledger](docs/images/showcase-admin-ledger.png)

#### Transportation

![Fun Travels transportation management](docs/images/showcase-admin-transportation.png)

#### Meal Plans

![Fun Travels meal plan management](docs/images/showcase-admin-meals.png)

#### Countries

![Fun Travels country management](docs/images/showcase-admin-countries.png)

#### Agency Network

![Fun Travels agency network](docs/images/showcase-admin-agencies.png)

#### System Users

![Fun Travels system user management](docs/images/showcase-admin-users.png)

### Create, Import & Export Workflows

#### Create a Tour

The tour form demonstrates route selection, scheduling, pricing, capacity, transportation, regional coverage, and meal-plan assignment.

![Fun Travels create-tour form](docs/images/workflow-create-tour.png)

#### Register Transportation

![Fun Travels transportation registration form](docs/images/workflow-create-transportation.png)

#### Add a Meal Plan

![Fun Travels add-meal-plan dialog](docs/images/workflow-add-meal.png)

#### Add an Agency

![Fun Travels add-agency dialog](docs/images/workflow-add-agency.png)

#### Import from Excel

Transportation units can be imported in bulk from an Excel spreadsheet. The dialog documents the expected first-row columns before upload.

![Fun Travels Excel import dialog](docs/images/workflow-import-excel.png)

#### Export Data

Tables support exporting the current data set—or selected rows—as a printable PDF document or an Excel spreadsheet.

![Fun Travels PDF and Excel export dialog](docs/images/workflow-export-data.png)

### Light Mode

#### Public Home

![Fun Travels home page in light mode](docs/images/light-desktop-home.png)

#### Tour Catalog

![Fun Travels tour catalog in light mode](docs/images/light-desktop-tours.png)

#### Sign In

![Fun Travels sign-in page in light mode](docs/images/light-desktop-login.png)

#### Administrator Profile

![Fun Travels administrator profile in light mode](docs/images/light-desktop-profile.png)

#### Tour Inventory

![Fun Travels tour inventory in light mode](docs/images/light-desktop-admin-tours.png)

#### Meal Plans

![Fun Travels meal plans in light mode](docs/images/light-desktop-admin-meals.png)

#### System Users

![Fun Travels system users in light mode](docs/images/light-desktop-admin-users.png)

### Mobile Responsive Experience

The mobile views below were captured at a `390 × 844` phone viewport after optimizing the navigation, page spacing, filters, actions, and data tables for smaller screens.

#### Light Mode

##### Mobile Home

![Fun Travels responsive mobile home page](docs/images/mobile-light-home.png)

##### Mobile Tour Catalog

![Fun Travels responsive mobile tour catalog](docs/images/mobile-light-tours.png)

##### Mobile Sign In

![Fun Travels responsive mobile sign-in page](docs/images/mobile-light-login.png)

##### Mobile Profile

![Fun Travels responsive mobile administrator profile](docs/images/mobile-light-profile.png)

##### Mobile Tour Inventory

![Fun Travels responsive mobile tour inventory](docs/images/mobile-light-admin-tours.png)

##### Mobile Customer Requests

![Fun Travels responsive mobile customer requests](docs/images/mobile-light-admin-requests.png)

##### Mobile System Users

![Fun Travels responsive mobile system users](docs/images/mobile-light-admin-users.png)

#### Dark Mode

##### Mobile Home

![Fun Travels responsive mobile home page in dark mode](docs/images/mobile-dark-home.png)

##### Mobile Tour Catalog

![Fun Travels responsive mobile tour catalog in dark mode](docs/images/mobile-dark-tours.png)

##### Mobile Sign In

![Fun Travels responsive mobile sign-in page in dark mode](docs/images/mobile-dark-login.png)

##### Mobile Profile

![Fun Travels responsive mobile administrator profile in dark mode](docs/images/mobile-dark-profile.png)

##### Mobile Tour Inventory

![Fun Travels responsive mobile tour inventory in dark mode](docs/images/mobile-dark-admin-tours.png)

##### Mobile Customer Requests

![Fun Travels responsive mobile customer requests in dark mode](docs/images/mobile-dark-admin-requests.png)

##### Mobile System Users

![Fun Travels responsive mobile system users in dark mode](docs/images/mobile-dark-admin-users.png)

## Quick Start

```bash
cp .env.example .env.local    # NEXT_PUBLIC_API_BASE_URL points at the server's /api/v1
npm install
npm run dev
```

The app starts at `http://localhost:3000`.

## Checks

`npm run typecheck`, `npm run lint`, and `npm run build`. GitHub Actions runs them on every push and pull request.

## Exports

Every Export button asks the server for a branded PDF or Excel report built from all matching records (`POST /api/v1/reports`), then downloads it with the user's token. Selected rows and signed-out visitors use the same template in the browser. Import templates are clean spreadsheets with an Instructions sheet.

## Documentation

Full documentation is in the separate repository: [fun-travels-tour-document](https://github.com/HussainALAradi5/fun-travels-tour-document)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js (App Router) | 16.3 | Application framework and routing |
| React | 19.2 | UI |
| TypeScript | 5.9 | Language |
| Chakra UI | 3.37 | Component library |
| Axios | 1.13 | HTTP client |
| STOMP.js | 7.3 | Live notifications over WebSocket |
| Stripe.js | 8.11 | Card top-ups |
| jsPDF, ExcelJS | 4.1, 4.4 | In-browser exports |

## Project Structure

```
src/
├── app/              # Next.js routes only; each page renders a page component
├── components/
│   ├── pages/        # Page-level containers composed by app/ routes
│   └── <domain>/     # Reusable UI (ui/custom) and domain components, kebab-case folders
├── config/           # api.config.ts (env-driven URLs), endpoints.ts, and the axios client
├── constants/        # Shared constant values (including the report template)
├── dtos/             # Generated mirrors of the server DTOs; do not edit by hand
├── enums/            # Enums with label/color maps
├── hooks/            # Data loading and state, one hook per concern
├── interfaces/       # Read models (DTO aliases), form types, and props, one per file
├── lib/              # Navigation helpers
├── services/         # Typed API services over the single client
├── types/            # UI-only types
└── utilities/        # Pure helpers, exports, auth and notification contexts
```
