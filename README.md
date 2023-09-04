# Overview

This is the challenge [Fullstack Challenge 🏅 Space X API](./FullstackChallenge.md) frontend.

Backend [here](https://github.com/Nil-ton/Space-X-API)


# Technologies

- next: ^13.4.19
- react-chartjs-2: ^5.2.0
- zustand: ^4.4.1
- tailwindcss: ^3.3.3
- shadcn/ui

## Dependencies

```json
"dependencies": {
    "@radix-ui/react-dialog": "^1.0.4",
    "@types/node": "20.5.9",
    "@types/react": "18.2.21",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "chart.js": "^4.4.0",
    "chartjs-plugin-datalabels": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "eslint": "8.48.0",
    "eslint-config-next": "13.4.19",
    "lucide-react": "^0.274.0",
    "next": "13.4.19",
    "postcss": "8.4.29",
    "react": "18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "18.2.0",
    "tailwind-merge": "^1.14.0",
    "tailwindcss": "3.3.3",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "5.2.2",
    "zustand": "^4.4.1"
  }
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

# Project Structure

## App Folder

- `./app/page.tsx`: Central page of the application.

## Components Folder

- `./components/ui`: Components of shadcn/ui
- `./components/ChartPie`: Pie chart component
- `./components/ChartBar`: Chart component with bar
- `./components/Pagination`: Pagination component
- `./components/SearchField`: Search bar component

## Hooks Folder

- `./hooks/useData.tsx`: Table information state manager
- `./hooks/useDataPie.tsx`: Pie chart state manager
- `./hooks/useDataBar.tsx`: Bar chart state manager
- `./hooks/useQueries.tsx`: Table lookup state manager
- `./hooks/useSearchOptions.tsx`: SearchField options state manager

## Libs Folder
- `./utils/utils`: Debounce function

## License

[MIT licensed](./LICENSE).
