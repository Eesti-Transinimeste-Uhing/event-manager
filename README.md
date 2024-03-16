# ETÜ

## About

This ([moon](https://moonrepo.dev/)) repository contains projects that run the
ETÜ Discord bot, as well as the web interface for it.

## Development

- Use NVM to get the Node version in the .nvmrc file
- Install yarn (we use the Berry version, but Classic should switch to it as well)
- Clone the repo, and cd into it
- Run `yarn --immutable`

Setup done! Check the `packages` and `apps` directories to find what you want to
work on.

To run a project, use `yarn moon [project]:[target]`. For example, `yarn
moon discord-bot:dev`. Note that some projects need an .env file. In these
cases, you'll find a `.env.example` in the project root. Copy this file and name
it `.env`, then fill out the fields.

To run all projects at once, use `yarn moon :dev`.
