# 🍵 MATCHA — Pure Fusion

A premium, immersive e-commerce experience dedicated to the world of high-quality matcha. This project blends high-end scrollytelling with a robust e-commerce foundation, offering users a sensory journey from initial splash to final sip.

## ✨ Key Features

- **🌊 Immersive Scrollytelling**: A dynamic landing page driven by `Framer Motion` that choreographs content as you scroll, creating a narrative experience.
- **🎨 Interactive Visuals**: Custom-built `MatchaSplashCanvas` providing a vibrant, organic background that responds to scroll progress.
- **🛒 Full E-commerce Suite**: Seamless shopping flow from product discovery in the `Shop` to a streamlined `Cart` and checkout experience.
- **🔐 Secure Authentication**: Integrated user accounts powered by **Supabase**, including email login and profile persistence.
- **👤 Modern Profile Hub**: Personalized user dashboards for managing account details, username updates, and order history tracking.
- **📖 Matcha Journal**: A curated space for articles and rituals, exploring the culture and craft of premium matcha.
- **💎 Premium Dark Aesthetic**: A sleek, dark-mode design system with bold typography, smooth transitions, and a focus on high-quality imagery.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*(See `.env.local.example` for reference)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (ProductSection, Custom Navbar, etc.).
- `/supabase`: Database migrations and configurations.
- `/utils`: Helper functions and Supabase client initializers.
- `/public`: Static assets including high-resolution product imagery and sequence frames.

## 🛠️ Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

---

*Crafted with passion for the perfect cup.* 🍃

