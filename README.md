# Jeman Mama — Portfolio

A responsive portfolio built with **Next.js App Router, React, and TypeScript**, ready for Vercel. The visual design combines an editorial cream-and-forest palette, locally hosted fonts, project illustrations, and a personal food photo journal.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run build
npm start
```

## Deploy on Vercel

Push this directory to your Git repository, then import the repository in Vercel.

- **Framework preset:** Next.js (automatically detected).
- **Root directory:** `portfolio` if you push the parent workspace; `.` if this directory is its own repository.
- **Build command:** `npm run build`.
- **Output directory:** leave the Next.js default.
- **Environment variables:** none required.

You can also run `npx vercel` from this directory to connect a Vercel project and deploy. This project has no dependency on Sites hosting.

## Content and customization

- `app/page.tsx`: project stories, technology list, workflow, biography, food captions, and contact details.
- `app/globals.css`: design system, layout, responsive behavior, and reduced-motion support.
- `app/layout.tsx`: page title, description, and social metadata.
- `public/Jeman-Mama-CV.pdf`: downloadable CV linked from the hero. Replace this file with the same filename when updating the CV.
- `public/images/`: optimized versions of supplied photos; food images are EXIF-transposed and exported to WebP without source metadata.
- `public/logos/`: locally downloaded Devicon technology logos, plus their license.
- `public/fonts/`: locally hosted DM Sans and DM Serif Display, with their SIL Open Font Licenses.

The food gallery supports savory/sweet filters, shuffle, expansion, and a keyboard-accessible photo viewer. Project stories expand in place; workflow tabs support arrow keys, Home, and End. The contact address supports mail links and clipboard copy.

All fintech client references use **Major Fintech Client**. Current lending operations work is marked as in development, and the approximate AI productivity improvement is explicitly identified as a team estimate. The downloadable CV follows the same generic project naming as the site. Confidential source documents are excluded from the public files.

## Asset credits

Technology logos: [Devicon](https://github.com/devicons/devicon), MIT license. Trademarks remain the property of their respective owners.

Fonts: [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display), SIL Open Font License 1.1.

Photography: supplied by Jeman Mama. Food captions are playful editorial copy; restaurant locations and ratings have not been inferred.
