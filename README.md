# libertyillustration.com

Website of Liberty Biomedical Visualization.

## Continuous integration

The project has an automated continuous integration workflow that performs
linting, testing, and other quality control processes on pull requests to the
`main` branch.

## Environment variables

The following environment variables are required to build and test this website:

- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_IMAGE_CDN_HOSTNAME`
- `CONTENTFUL_SPACE_ID`

When possible, environment variables should be access through the
`src/lib/config.ts` module. This module validates that the environment is
complete and will fail fast should a value be undefined.

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

To run integration tests:

```bash
$ npm run test:integration
```

#### Unit tests

Unit tests contain a `.spec` segment before the `.ts` or `.tsx` file extension.

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
