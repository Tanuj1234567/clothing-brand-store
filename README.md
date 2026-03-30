# NOIRVAULT - Premium E-commerce Store

Modern full-stack clothing brand e-commerce app for Gen Z / young adults built with Next.js, Tailwind, MongoDB, JWT auth (HTTP-only cookie sessions), and Razorpay integration.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js API Routes (Node runtime)
- Database: MongoDB + Mongoose
- Auth: JWT + HTTP-only cookie session
- Payment: Razorpay (India)
- State: Zustand (cart, auth, wishlist)
- UX: loading skeletons, toast notifications, responsive design, dark mode support

## Brand

- Name: **NOIRVAULT**
- Style: Minimal, premium, modern
- Palette: Black, White, Accent Gold (`#C9A86A`)

## Features Included

- Home page with hero, featured products, categories, newsletter section
- Product listing page with category + price + sorting options
- Product detail page with image gallery, size selector, add to cart
- Cart page with quantity updates and summary
- Checkout page with address form + Razorpay order flow
- JWT signup/login
- Admin dashboard (add/delete products, view orders)
- Wishlist (bonus)
- Product reviews API + UI
- Dark mode foundation (bonus)
- Reusable UI components + API layer
- Dummy product seed data
- Error handling and global error boundary
- Zod request validation on auth/order/review endpoints
- In-memory rate limiting for auth and payment endpoints
- Razorpay signature verification endpoint

## Folder Structure

`src/app`  
- Page routes (`/`, `/products`, `/cart`, `/checkout`, `/login`, `/signup`, `/admin`, `/wishlist`)  
- API routes (`/api/auth`, `/api/products`, `/api/orders`, `/api/payment/create-order`, `/api/payment/verify`)

`src/components`  
- Reusable UI components (`Navbar`, `Footer`, `ProductCard`, `Skeleton`, `providers`)

`src/lib`  
- Infrastructure/utilities (`db`, `jwt`, `auth`, `validation`, `rate-limit`, `sample-data`)

`src/models`  
- Mongoose models (`User`, `Product`, `Order`, `Review`)

`src/store`  
- Zustand store (`useStore`)

`src/types`  
- Shared TypeScript types

## Setup Instructions

1. Install Node.js 18.18+ (or Node.js 20 LTS).
2. Clone/copy this project.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create env file:
   ```bash
   cp .env.example .env.local
   ```
5. Fill MongoDB + JWT + Razorpay keys in `.env.local`.
6. Run development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables Needed

- `MONGODB_URI`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## Admin Access

- Signup with an email containing `admin` (e.g. `admin@noirvault.com`) to get admin role in this starter.
- For production, replace this logic with secure role assignment via admin-only controls.

## Production Notes

- Consider replacing the in-memory rate limiter with Redis for multi-instance deployments.
- Add request logging + monitoring (e.g., Sentry, OpenTelemetry).
- Add image optimization pipeline / CDN.
- Add tests (unit + integration + e2e).
