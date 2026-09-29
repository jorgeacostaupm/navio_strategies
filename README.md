# Navio: representative selection strategies

A React and Vite project for developing and comparing different representative selection strategies in Navio when the number of data records exceeds the number of pixels available to display them.

## Where Navio lives

The local library source is in `navio/`. Its entry point is `navio/src/index.js`, and its main implementation is in `navio/src/navio.js`. The `src/NavioExample.jsx` component uses it with a simple sample dataset.

## How we import it

```jsx
import navio from "navio";
```

This works because `vite.config.js` defines the `navio` alias pointing to `navio/src/index.js`, so we use the local source code directly. Without the alias, we could write the following in `src/NavioExample.jsx`:

```jsx
import navio from "../navio/src/index.js";
```

## What we want to explore

Currently, `computeRepresentatives()` in `navio/src/navio.js` selects rows at regular intervals based on the number of records and the available space: it takes the first row of each block in the current ordering.

The goal is to add alternative strategies for row selection when the available space is insufficient to show all the data.

## Run

```sh
npm run dev
```
