# Weather React Vite App with ShadcnUI

This project is a weather application built with React and Vite, utilizing the ShadcnUI component library for a sleek and responsive user interface.

## ScreenShots

![image](https://github.com/user-attachments/assets/bc54e590-5ac4-4e6a-bef1-e97d52b28582)

![image](https://github.com/user-attachments/assets/868de431-d298-4296-80c4-28b2e0b429d5)

## Live Preview

Check out the live demo of the Weather App: [Weather App Demo](weather-app-abdelghani.vercel.app/)

## Features

- Search functionality for different locations
- Responsive design for various screen sizes
- Elegant UI components powered by ShadcnUI

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/babdellghani/Weather-App-React-Vite-ShadcnUI.git
   ```

2. Navigate to the project directory:
   ```
   cd Weather-App-React-Vite-ShadcnUI
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Obtain an API key from a weather service provider (e.g., OpenWeatherMap).
2. Create a `.env` file in the root directory and add your API key:
   ```
   VITE_APP_API_KEY=your_api_key_here
   ```
The Api From `https://www.weatherapi.com/`.

## Running the App

To start the development server:

```
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
Weather-App-React-Vite-ShadcnUI/
├── src/
│   ├── components/
│   │   └── ...
│   └── ...
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- React
- Vite
- ShadcnUI
- Tailwind CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
