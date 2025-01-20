# libertyillustration.com

Website of Liberty Biomedical Visualization.

## Contact form

The site uses SendGrid to send contact form emails. Some of the contact form
email details are configurable using the following environment variables:

- `CONTACT_RECIPIENT_EMAIL`
- `CONTACT_SENDER_EMAIL`
- `CONTACT_SENDER_NAME`

A SendGrid API key must also be configured to make requests:

- `SENDGRID_API_KEY`

## Environment variables

The following environment variables are required to build and test this website:

- `CONTACT_RECIPIENT_EMAIL`
- `CONTACT_SENDER_EMAIL`
- `CONTACT_SENDER_NAME`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ASSET_CDN_HOSTNAME`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_IMAGE_CDN_HOSTNAME`
- `CONTENTFUL_SPACE_ID`
- `SENDGRID_API_KEY`

When possible, these environment variables should be accessed through the
`src/lib/config.ts` module. This module validates that the environment is
complete and will fail fast should a value be undefined.

The following environment variables are optional, and used for running E2E tests
before deployments:

- `E2E_BASE_URL`
- `E2E_DEPLOYMENT`

## Scripts

### Development

To run the development server:

```bash
$ npm run dev
```

To build the project:

```bash
$ npm run dev
```

To host the built project:

```bash
$ npm start
```

### Formatting

To format all files:

```bash
$ npm run format:all
```

To check that all files are properly formatted:

```bash
$ npm run format:check:all
```

### Linting

To lint the entire project:

```bash
$ npm run lint:all
```

### Testing

This project supports E2E, integration, and unit testing.

Integration and unit tests can be run together to produce a coverage report:

```bash
$ npm run test
```

#### E2E tests

E2E tests contain a `.spec` segment before the `.ts` file extension. They are
co-located with the pages that they test.

E2E testing is performed against the production build of the project, so the
project needs to be built before running E2E testing scripts.

To run the E2E test suite in headless mode:

```bash
$ npm run test:e2e:run
```

To run the E2E test suite with an interactive GUI:

```bash
$ npm run test:e2e:open
```

To run an interactive GUI to record E2E tests:

```bash
$ npm run test:e2e:codegen
```

#### Integration tests

Integration tests contain a `.test` segment before the `.ts` file extension.
They are co-located with the modules they test.

To run integration tests:

```bash
$ npm run test:integration
```

#### Unit tests

Unit tests contain a `.spec` segment before the `.ts` or `.tsx` file extension.
They are co-located with the modules they test.

To run unit tests:

```bash
$ npm run test:unit
```

To run unit tests in watch mode:

```bash
$ npm run test:unit:watch
```

### Type checking

To check that type annotations satisfy the compiler:

```bash
$ npm run type-check
```

## Workflows

There are several GitHub Actions workflows supporting testing and deployment
automation.

### Continuous integration

The continuous integration workflow is triggered by pull requests against the
`main` branch. It performs linting, testing, and other quality control
processes. The site will be built using development content, and E2E tests will
be run against the build.

### Deployment

The deployment workflow is triggered by new source code releases. Unit and
integration tests are run against the release, which is then built and deployed
to a preview environment using production content. E2E tests are run against the
preview build. If the E2E tests pass, the site is then deployed to production.

### Publish

The publish workflow is triggered via webhook by content management systems when
production content has been changed. This workflow rebuilds and deploys the
website using the latest source code release and content changes. Multiple calls
to the webhook will queue at most one additional pending run of the workflow.
This guarantees that the latest content changes will be captured without
rebuilding and deploying the site for each individual change.
