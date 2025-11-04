# B Maison – Landing Page

Static, dark alpine-inspired hotel landing page built with HTML, CSS, and JavaScript.

## Local development

Open `index.html` directly in a browser, or use any static server.

```bash
# using npx
npx serve .
```

## Deploy to Vercel

1. Install the Vercel CLI and log in:

```bash
npm i -g vercel
vercel login
```

2. From the project root, deploy:

```bash
vercel
```

3. For repeat deployments to the same project:

```bash
vercel --prod
```

`vercel.json` is configured for a static site. No server code is required.

## Customize
- Update images by replacing the Unsplash URLs in `index.html`.
- Change brand name and copy in the sections.
- Colors and spacing are managed via CSS variables in `styles.css`.



