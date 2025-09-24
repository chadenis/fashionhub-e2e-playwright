## Project Description

This repository have e2e and api automated test for the **FashionHub demo app** and **github api** is build using **Playwrigth** and **Typescript**.

The test suite validates **UI behavior** as page navigation, login flow, browser console errors and **Api response** from github pull request, can be runned in different environments (local, staging, production) and in different browsers in parallel (Chrome, Firefox, Safari).

## Tech Stack / Tools

- [Playwright](https://playwright.dev/) – End-to-end testing framework
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- [Node.js](https://nodejs.org/) – Runtime environment
- [Docker](https://www.docker.com/) – Run the FashionHub demo app locally
- [GitHub API](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28) – Used for pull request validation

## Project Structure

```
src/
  config/       # environment configuration (local, staging, prod)
  fixtures/     # test data, locators
    openPrs     # csv created/edited by the test
  pages/        # Page Object Models (login, account, etc.)
  tests/        # test cases (UI / API)
  utils/        # helpers (csv, github, console watcher, etc.)
```

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)
- [Docker](https://www.docker.com/) (to run the demo app locally)
- Git

### Installation

```bash
git clone git@github.com:chadenis/fashionhub-e2e-playwright.git
cd fashionhub-e2e-playwright
npm install
```

## Running the App Locally

The FashionHub demo app can be run in a Docker container to allow testing against `http://localhost:4000/fashionhub/`.

### Start the app and run tests

Use the npm script provided:

```bash
npm run test:local
```

This script will:

1. Start the Docker container for the demo app on port 4000.
2. Run the Playwright tests against the LOCAL environment.
3. Stop the Docker container once tests finish.

### Access local env manually

```bash
npm run docker:start
```

Navigate this url in the browser: http://localhost:4000/fashionhub/

```bash
npm run docker:stop
```

## Tests execution

Run all tests **headless** by environment:

### Local

```bash
npm run test:local
```

### Staging

```bash
npm run test:staging
```

### Production

```bash
npm run test:prod
```

Run all tests **using the test runner** by environment:

### Local

```bash
npm run test:local:ui
```

### Staging

```bash
npm run test:staging:ui
```

### Production

```bash
npm run test:prod:ui
```

## Open the report after execution

```bash
npm run report
```

## Run test by tags

### Command structure and important param

- Set the TARGET using any of this options "LOCAL" / "STAGING" / "PROD"
- -g "@tagname" - The @tagname is in the test title

e.g.: run in local env all the tests with tag "@tc2"

```bash
TARGET=LOCAL npx playwright test -g "@tc2"
```

## Test cases implemented

### TC1: validation of console errors on Home and About pages

### TC2: validation of all links of the home page returns 200/30x status codes

### TC3: User Login with valid credentials

### TC4: Get all appwrite open pr's via github api and create csv file in fixter/openPrs directory
