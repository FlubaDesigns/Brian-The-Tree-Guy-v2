# Overview

Brian The Tree Guy is a local tree service business website for Sarasota County, Florida. The application is a full-stack web platform built with React on the frontend and Express on the backend, designed to showcase tree services, display a gallery of completed work, and provide easy contact options for potential customers. The site emphasizes mobile responsiveness, conversion optimization, and prominent call-to-action elements featuring the business phone number (941-445-2234).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**Routing:** Wouter for lightweight client-side routing with four main pages:
- Home (/)
- Services (/services)
- Gallery (/gallery)
- Contact (/contact)

**UI Component Library:** Shadcn/ui components with Radix UI primitives, providing accessible, pre-styled components following the "new-york" style variant

**Styling:** Tailwind CSS with custom design tokens configured for the brand:
- Primary color: Orange (#FF7F00 / HSL 25 100% 50%)
- Typography: Inter font family as primary
- Custom spacing, border radius, and shadow utilities
- Dark mode support via CSS variables

**State Management:** TanStack React Query (v5) for server state management, handling API data fetching and caching

**Design System:** 
- Component-based architecture with reusable UI elements (Header, Footer, Hero, ServiceCard, GalleryLightbox)
- Consistent spacing system (16px, 24px, 40px, 64px)
- Mobile-first responsive design approach
- Fixed sticky header with hamburger menu on mobile
- Conversion-focused design with prominent CTAs

**Key Features:**
- Gallery lightbox with keyboard navigation and image cycling
- Responsive image grid with fallback placeholders
- Loading states using skeleton components
- Error handling with user-friendly messages

## Backend Architecture

**Runtime:** Node.js with Express.js

**API Design:** RESTful endpoints for data retrieval:
- GET /api/services - Returns list of tree services
- GET /api/gallery - Returns gallery images

**Development Mode:** Vite middleware integration for hot module replacement during development

**Production Build:** 
- Client built with Vite to dist/public
- Server bundled with esbuild to dist/index.cjs
- Static file serving from dist/public in production

**Storage Layer:** In-memory storage implementation (MemStorage class) that implements the IStorage interface:
- Services data with titles, descriptions, icons, and ordering
- Gallery images with source URLs, alt text, and ordering
- User data structure (prepared for future authentication)

**Data Models:**
- Services: id, title, description, icon (string reference), order
- Gallery Images: id, src, alt, order
- Users: id, username, password (prepared for future use)

**Logging:** Custom request logging middleware tracking:
- HTTP method, path, status code
- Response time in milliseconds
- API route-specific logging

**Build Process:**
- Two-stage build: client (Vite) then server (esbuild)
- Server dependencies bundled via allowlist for faster cold starts
- Source maps generated for debugging

## External Dependencies

**Database:** PostgreSQL with Drizzle ORM
- Schema defined in shared/schema.ts
- Migrations managed via Drizzle Kit
- Configuration expects DATABASE_URL environment variable
- Note: Currently using in-memory storage; database integration prepared but not actively used

**Session Management:** Infrastructure prepared for:
- connect-pg-simple for PostgreSQL session storage
- express-session for session handling

**UI Component Primitives:** Radix UI components for:
- Dialogs, dropdowns, tooltips, navigation menus
- Accordions, tabs, carousels
- Form controls (checkboxes, radio groups, selects)
- All components are accessible and keyboard-navigable

**Image Handling:** No external image hosting service; images served from public directory

**Email/Contact Forms:** Not currently implemented (contact page shows phone number prominently)

**Analytics:** Google Analytics referenced in legacy HTML but not implemented in current React app

**Development Tools:**
- Replit-specific plugins for development environment
- Hot reload and error overlay in development
- TypeScript for type safety across shared schema and API contracts

**Build & Bundling:**
- Vite for frontend bundling with React plugin
- esbuild for backend bundling
- PostCSS with Tailwind CSS and Autoprefixer
- Path aliases (@/, @shared/, @assets/) for clean imports