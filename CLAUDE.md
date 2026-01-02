# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoteBD is a Bangladesh election and political finance information system built on LoopBack (Node.js REST API framework) with an AngularJS frontend. It provides candidate profiles, political party information, and election analysis.

## Commands

```bash
# Install dependencies (includes bower install && grunt build via postinstall)
npm install

# Start server (production)
npm start

# Start server with auto-reload (development)
npm run dev

# Build frontend
grunt build

# Start both API and frontend with livereload
grunt serve

# Run server-side tests (Mocha)
npm test

# Run client-side tests (Karma/Jasmine)
node_modules/.bin/karma start client/test/karma.conf.js
```

### Environment Variables

```bash
# Connect to MongoDB (uses in-memory db if not set)
MONGODB_URL="mongodb://localhost:27017/votebd"

# Load initial seed data (users, settings)
INITDB=true

# Development access token for API authentication
DEV_ACCESS_TOKEN=MySecretToken

# Set API URL for lb-services.js generation
API_URL=http://0.0.0.0:3000/api grunt
```

## Architecture

### Backend (LoopBack)

- **Entry point**: `server/server.js`
- **Models**: 38 JSON model definitions in `common/models/` - LoopBack auto-generates REST endpoints
- **Boot scripts**: `server/boot/` - numbered scripts execute in order (00-access-token.js through 99-fake-data.js)
- **Authentication**: Passport.js with local + social auth (Facebook, Google, Twitter)
- **Database**: MongoDB primary (via MONGODB_URL env var), falls back to in-memory

Key models: User, Election, Candidate, PoliticalParty, Voter, Division, District, Upazilla, Union

### Frontend (AngularJS 1.4)

- **Main app**: `client/app/js/app.js`
- **Modules**: `client/app/modules/` - feature-based organization
  - `core/` - base services, controllers, directives
  - `elections/`, `candidates/`, `political-party/` - admin modules
  - `f-*` prefix modules (f-home, f-candidate-search, f-election-analysis) - public frontend views
- **Routing**: Angular UI-Router
- **Forms**: Angular Formly (JSON-based form generation)
- **Charts**: D3.js and C3.js for data visualization

### Build System (Grunt)

- Concatenation, minification, cache-busting via filerev
- `grunt serve` proxies API and enables livereload
- `grunt build` produces production-ready assets in `client/dist/`

## Default Test Users

- Admin: `admin@admin.com` / `admin`
- User: `user@user.com` / `user`

## Code Style

- 2-space indentation
- Single quotes for strings
- Strict mode required
- camelCase naming
- JSHint for linting (config: `.jshintrc`)
