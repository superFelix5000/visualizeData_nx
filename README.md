# monorepo exploration project

This started with moving my [bank data visualization project](https://github.com/superFelix5000/visualizeData) over to an NX monorepo. My plan now is to move most of my side projects here if possible and let them share as much code as possible.

## What's in it
- Angular frontend for bank data visualization
- [Deno backend](https://github.com/superFelix5000/bankDataServer) for holding the bank data 
- Ionic/Capacitor mobile app (which is empty for now) for testing the visualization on mobile
- more to come...

## Sandbox
This is a bit of a Frankenstein's monster for testing out various frameworks and tools (or getting better at them), such as
- NX / monorepos
- tailwind css
- rome for linting and formatting as an alternative to eslint/prettier
- capacitor / ionic
- angular material
- pnpm as an alternative to npm
- akita as a minimal store solution as an alternative to ngrx
- chart.js
- rxjs
- deno
- ...

## Todo
- adjust the docker/docker compose support to work within the monorepo usinx NX

## Usage
- run `pnpm install`
- run `nx serve deno-api` for starting the backend
- run `nx serve finance-frontend` for the frontend
- run `npm run lint` or `npx rome check .` for linting
- run `npm run format` or `npx rome format --write .` for formatting
