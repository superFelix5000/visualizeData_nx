# monorepo exploration project

This started with moving my [bank data visualization project](https://github.com/superFelix5000/visualizeData) over to an NX monorepo. My plan now is to move most of my side projects here if possible and let them share as much code as possible.

## What's in it
- Angular frontend for financial data visualization, moved over from [here](https://github.com/superFelix5000/visualizeData)

## Sandbox
This is a bit of a Frankenstein's monster for testing out various frameworks and tools (or getting better at them), such as
- NX / monorepos
- tailwind css
- rome for linting and formatting as an alternative to eslint/prettier
- angular material
- pnpm as an alternative to npm
- akita as a minimal store solution as an alternative to ngrx
- chart.js
- rxjs
- docker/docker compose
- ...

## Todo
- create script for starting frontend and backend in parallel using nx

## Usage
- run `pnpm install`
- run `nx serve finance-frontend` for the frontend
- run `npm run lint` or `npx rome check .` for linting
- run `npm run format` or `npx rome format --write .` for formatting

### Docker
- run `nx build finance-frontend` for first building the frontend into the dist folder from which it is later copied to the docker container
- run `docker compose up` for starting backend and frontend
- run `docker compose up finance-frontend` for starting only the frontend
