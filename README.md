# NEO Tracker Coding Challenge

**Your goal is to set up the front-end UI for an application which enables the user to view and manage shipments. The main goal is for the user to check shipments at a glance. This allows users to make faster decisions and plan ahead of time.**

# Use cases

- The user should be able to:
  - See shipments in pages of 20 elements per page
  - Search by shipment id
  - Sort by different fields (e.g. id, name) in ascending/descending order
  - Be able to filter shipments by different criteria, like destination, cargo, etc. (open-ended)
  - View the shipment information on a separate shipment details page
  - Update the shipment name (should persist when the page is reloaded)

The interactions should not refresh the page.

# Evaluation Criteria

## Must Have

- Use React/JS. You can use any libraries you'd like
- The application must start
- The application must be divided into components
- The file structure must be consistent and easy to follow
- Must cover all [use cases](README.md#use-cases) with minor issues
- Tests written and passing for functions used to sort and filter shipments (ie. not testing the UI display but the utility functions)

## Nice to Have

- TypeScript is used (and don't use "any" types)
- Use [Styled Components](https://styled-components.com/) for styling
- Use React Hooks where possible
- The application is configurable by environment variables
- The application has a development and production environment
- The application has good naming
- The application computes values
- The application is responsive
- Use higher order functions (e.g. map, filter, reduce) and immutable variables

## Negatives

- No componentization
- No modularization
- Inline styles
- No control over re-rendering (e.g. not using id for a list)
- Bad naming
- Direct DOM manipulation

# How to submit

- Clone this repository
- Complete your project as described above within your local repository
- Make sure that there are scripts to start both the server and the client
- Push your changes to your GitHub and send us a link to the repo

# How to run API server

The boilerplate includes a small service for data fetching. The file `db.json` includes all the necessary data to achieve the goal. Please follow the steps below to start the server:

- `yarn install` or `npm install`
- `yarn server` or `npm run server`

See [json-server](https://github.com/typicode/json-server) for more information.

# Time limit

1 week from the time we send you the test should be sufficient to fulfill a lot of the above requirements. Our advice is to focus on making sure that the application works properly and fulfills the "must-haves" [above](README.md#must-have) before moving on to secondary objectives. Happy coding!
