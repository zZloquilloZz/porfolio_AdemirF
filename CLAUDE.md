# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ademir Fernández — a bilingual (ES/EN) single-page React application built with Vite. Deployed to GitHub Pages at `/ademir-portfolio/` via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — start local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

No linter, formatter, or test runner is configured.

## Architecture

This is a minimal single-file React app with no routing, no state management library, and no CSS framework.

- **`src/Portfolio.jsx`** — The entire application lives here: all components, all content/translations, and all styles (inline + a single `<style>` block with CSS classes). The bilingual content is defined in a large `t` object (`t.es` / `t.en`) at the top of the component scope.
- **`src/main.jsx`** — React entry point, renders `<Portfolio />`.
- **`vite.config.js`** — Sets `base: "/ademir-portfolio/"` for GitHub Pages path prefix.

Key internal components (all in `Portfolio.jsx`):
- `Carousel` — Image carousel for featured projects
- `Section` — Wrapper that adds scroll-triggered fade-in via `IntersectionObserver`
- `Portfolio` — Root component with nav, hero, about, skills, experience, projects, education, contact form, and footer

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`: `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages.

## Static Assets

`public/` contains `favicon.svg`, `images/` (project screenshots), and `cv/` (PDF resumes in ES/EN).
