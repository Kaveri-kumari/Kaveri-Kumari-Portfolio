# Kaveri Kumari — Portfolio

A responsive React + Vite developer portfolio with light/dark themes, Framer Motion transitions, editable project and experience data, and an optional contact endpoint.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Personalize before publishing

- Update `LINKS` and content arrays in `src/main.jsx`.
- Replace blank `repo`, `demo`, and `verification` values only with verified URLs.
- Edit experience entries and verify employment / internship status and dates.
- Confirm statistics and education values before publishing.
- Replace `public/Kaveri-Kumari-Resume.pdf` with your newest resume when it changes.
- The supplied photo is in `public/assets/kaveri-profile.jpg`.

## Contact form delivery

The form has client-side validation and loading, success and error states. It does **not** pretend to deliver messages when no service is configured. To enable real delivery, set `VITE_CONTACT_ENDPOINT` to your own backend or email-service endpoint in the deployment environment. The endpoint must accept a JSON POST with `name`, `email`, `subject`, and `message` and return a 2xx response on success. Implement server-side validation, spam protection, rate limiting, and email delivery; do not expose private API keys in Vite client-side variables.

See `.env.example` for the variable name.


## Windows install note

If you previously installed the Rolldown-based Vite version and saw a missing native binding error, use the pinned standard Vite version in this package. Follow [FIX-WINDOWS.md](./FIX-WINDOWS.md) and remove both `node_modules` and `package-lock.json` before reinstalling.


## Portfolio content update

The Experience section has been removed because the portfolio is positioned for entry-level opportunities. The hero role rotation now includes “Aspiring Software Developer” and “MERN Stack Developer”. Navigation and footer links have been updated accordingly.
