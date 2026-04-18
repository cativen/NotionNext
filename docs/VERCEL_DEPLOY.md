# Vercel Deployment

This project is ready to deploy on Vercel as a standard Next.js app.

## Recommended settings

- Framework Preset: `Next.js`
- Root Directory: project root
- Install Command: leave empty and let Vercel auto-detect
- Build Command: leave empty and let Vercel run the default Next.js build
- Output Directory: leave empty
- Node.js Version: `22.x`

## Required environment variables

- `NOTION_PAGE_ID=7db5043178eb4270bb6d2e590404c181`

## Recommended environment variables

- `NEXT_PUBLIC_LINK=https://your-domain.vercel.app`
- `NEXT_PUBLIC_AUTHOR=cativen`
- `NEXT_PUBLIC_THEME=simple`

## Deploy from GitHub

1. Import the GitHub repository into Vercel.
2. Confirm the framework is detected as `Next.js`.
3. Set Node.js Version to `22.x` in Project Settings.
4. Add the required environment variables for `Production`, `Preview`, and `Development` as needed.
5. Trigger the first deployment.

## Local sync with Vercel

```bash
vercel env pull .env.local
```

This keeps local development aligned with the environment variables configured in Vercel.

## Verification checklist

- `npm run build` passes locally
- Homepage loads successfully
- Notion content is visible after deployment
- `NEXT_PUBLIC_LINK` matches the production domain
- Custom domain is assigned in Vercel before final SEO indexing

## Notes

- Do not set `EXPORT=true` on Vercel. This project should run with the normal Next.js build mode.
- The repository contains `vercel.json`, but the deployment is still expected to use the standard Next.js framework flow.
- Optional integrations such as Clerk, Redis, Algolia, analytics, comments, and Mailchimp only need environment variables if you enable those features.
