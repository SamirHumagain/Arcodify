# Arcodify Frontend Assessment

Hi, I'm Samir Humagain, and this is my submission for the Arcodify Frontend Assessment.

## Overview

This project is a Next.js e-commerce storefront and admin dashboard built for the Arcodify assessment. It demonstrates:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand (state management)
- axios (data fetching)
- react-hook-form + zod (forms & validation)
- shadcn/ui (modal/dialog)

## Architecture

- **Public Side**: Storefront grid, product list, product details, cart, checkout modal
- **Admin Side**: Login/signup (mock), dashboard products (search, filter, pagination, add/remove), dashboard users (search)
- **State**: Zustand stores for products, cart, and auth
- **API**: axios instance with interceptors; mock endpoints for admin actions
- **Forms**: react-hook-form + zod for login/signup
- **UI**: Tailwind for layout, shadcn/ui for modal dialogs

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Key Features

- Product list with search, filter, pagination
- Product details with add to cart
- Cart and checkout modal
- Admin dashboard with product/user management
- Mocked add/remove product endpoints
- Auth guard for admin routes

## Bonus (Optional)

- Theme toggle
- Skeleton loaders
- Optimistic updates

## Folder Structure

- `/app` — Next.js routes (public, auth, dashboard)
- `/components` — UI components
- `/stores` — Zustand stores
- `/lib` — API, types, helpers
- `/pages/api/mock` — Mock endpoints
- `/styles` — Tailwind CSS

## Author & Assessment

I built this project for the Arcodify Frontend Assessment. See the assessment brief for grading criteria and acceptance tests.

Feel free to reach out if you have any questions about my implementation or want to discuss frontend development!
