# Jabri Versicherung

A modern insurance services website built with React, TypeScript, and Vite.

## Features

- Multi-step insurance application form
- Multi-language support (German/English)
- Responsive design with Tailwind CSS
- Cookie consent management
- SEO optimized with sitemap and robots.txt
- Secure headers and content security policy

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icons
- **Supabase** - Backend and database

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/jabri-versicherung.git
   cd jabri-versicherung
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env` (if applicable)
   - Add your Supabase credentials

4. Start development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Deployment

This project is configured for **Netlify** hosting. See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy automatically

## Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── translations/     # i18n translations
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── dist/                # Build output
└── netlify.toml         # Netlify configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

## License

Private - All rights reserved

## Contact

Jabri Versicherung
Email: info@jabriversicherung.de
