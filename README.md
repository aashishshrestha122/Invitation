# Wedding Invitation

A Next.js wedding invitation with an interactive envelope, photo gallery, and countdown.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Build

```sh
npm run build
```

## Deploy to GitHub Pages

This app is statically exported to `out/`. The workflow at `.github/workflows/deploy.yml` deploys the site when changes are pushed to `main`.

Create a public GitHub repository, push this project to its `main` branch, then select **Settings → Pages → Build and deployment → GitHub Actions**. The workflow configures the correct repository base path automatically.
