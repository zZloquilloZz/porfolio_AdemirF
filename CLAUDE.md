# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ademir Fernández — a bilingual (ES/EN) single-page React application built with Vite. Deployed to GitHub Pages at `/porfolio_AdemirF/` via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — start local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

No linter, formatter, or test runner is configured.

## Architecture

This is a minimal React app with no routing, no state management library, and no CSS framework. Split across a few files:

- **`src/Portfolio.jsx`** — All UI components, the icon maps (devicon helpers, education icons), and the contact form logic. Reads content from `data.js`.
- **`src/data.js`** — All bilingual content/translations (the `translations` object, `translations.es` / `translations.en`) plus the carousel image arrays (`camImages`, `ppImages`, `utpImages`). **Edit project/experience/education copy here, not in `Portfolio.jsx`.**
- **`src/styles.css`** — Global stylesheet (CSS classes), imported from `main.jsx`.
- **`src/main.jsx`** — React entry point, imports `styles.css` and renders `<Portfolio />`.
- **`vite.config.js`** — Sets `base: "/porfolio_AdemirF/"` for the GitHub Pages path prefix.

Key internal components (all in `Portfolio.jsx`):
- `Carousel` — Image carousel for featured projects
- `Section` — Wrapper that adds scroll-triggered fade-in via `IntersectionObserver`
- `Portfolio` — Root component with nav, hero, about, skills, experience, projects, education, contact form, and footer

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`: `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages.

## Static Assets

`public/` contains `favicon.svg`, `images/` (project screenshots), and `cv/` (PDF resumes in ES/EN).
