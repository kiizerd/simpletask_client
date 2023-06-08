# SimpleTask

<!-- A brief description of what your project does and who it's for -->

## Straightforward project management solution
In today's fast-paced and multitasking world, people often juggle multiple projects and tasks simultaneously. The challenge of managing all these projects effectively can lead to stress, missed deadlines, and errors. Traditional methods like to-do lists or spreadsheet-based tracking can be inefficient, easily outdated, or cumbersome to manage.

SimpleTask aims to solve this problem by providing a clear, user-friendly, and efficient platform for managing tasks and projects. It enables users to keep track of their tasks, deadlines, and priorities in one place.

Built mainly to learn and gain more familiarity with React, Typescript, and Ruby on Rails.
By the time the app was deployed, I had a better understanding of types, especially generics, in Typescript, and the flow of a request through a Rails app.
Setting up ESLint + Prettier for the client was game changing in terms of staying organized and preventing errors.

## Features

- User sessions
  - Secure API authorization using encrypted cookies
  - Session persists on browser close, until cookie expires
- Users can manage Projects
  - Projects can have many Sections
  - Sections can have many Tasks
- Pomodoro timer
  - Timer completions will be stored in a User related model
  - Each task will be able to track timers spent on it
- Seamless server interaction with SWR and native fetch

## Technologies Used

- [Typescript](https://github.com/microsoft/TypeScript/#readme)
- [React](https://github.com/facebook/react)
- [Vite](https://github.com/vitejs/vite)
- [MantineUI](https://github.com/mantinedev/mantine)
- [react-router](https://github.com/remix-run/react-router)
- [SWR](https://github.com/vercel/swr)
- [reanct-dnd](https://github.com/react-dnd/react-dnd)

## Project Setup

Replace `yarn` with `npm install` or `npm run` if desired

- Clone repo

```sh
  git clone https://github.com/kiizerd/simpletask_client.git
```

- Install dependencies

```sh
  cd simpletask_client && yarn
```

- Start dev server

```sh
yarn dev
```

- Build

```sh
yarn build
```

- Preview (only after build)

```sh
yarn preview
```
