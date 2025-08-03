# Matt Woods' Blog

Personal blog and portfolio website built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com), featuring articles on product management, marketing, and software development.

## About

This is the personal website of Matt Woods, a Senior Product Manager at Digible. The site features:

- **Blog Articles**: Insights on product management, marketing strategies, book summaries, and software development
- **Professional Portfolio**: Work experience and project highlights
- **Speaking Engagements**: Information about talks and presentations
- **Project Showcase**: Details of notable projects and contributions

## Getting started

To run this site locally, first install the npm dependencies:

```bash
npm install
```

Create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/images` - Static images and logos
- `/src/lib` - Utility functions and data fetching
- `/src/styles` - CSS and styling files
- `/_archive` - Archived content and legacy files

## Content Management

Articles are written in MDX format and stored in `/src/app/articles/`. Each article is in its own directory with a `page.mdx` file containing the content and metadata.

## Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom components
- **Content**: [MDX](https://mdxjs.com) for article authoring
- **UI Components**: [Headless UI](https://headlessui.dev) for interactive elements
- **Code Highlighting**: Prism.js for syntax highlighting

## Deployment

The site is optimized for deployment on platforms like Vercel, Netlify, or any static hosting service that supports Next.js.

Available scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
