# Expo Project

This is an [Expo](https://expo.dev) project built with React Native.

## Technologies and Versions

- **Expo**: ~51.0.28
- **React**: 18.2.0
- **React Native**: 0.74.5
- **TypeScript**: ~5.3.3
- **Tailwind CSS**: ^4.5.1 (via twrnc)
- **React Query**: ^5.56.2 (via @tanstack/react-query)

## Prerequisites

- Node.js (v20.x or later)
- npm (v10.x or later)
- Expo CLI (v7.x or later)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

1. Start the Expo development server:
   ```bash
   npx expo start
   ```

2. Use the Expo Go app on your iOS or Android device to scan the QR code from your terminal to open the app.

   Alternatively, you can run on a simulator or emulator:

   - For iOS Simulator:
     ```bash
     npx expo run:ios
     ```

   - For Android Emulator:
     ```bash
     npx expo run:android
     ```

## Development

- The main application code is located in the `app` directory.
- This project uses [Expo Router](https://docs.expo.dev/router/introduction/) for navigation.
- Styling is done using [twrnc](https://github.com/jaredh159/tailwind-react-native-classnames), a Tailwind CSS-like utility for React Native.
- State management and server-state synchronization are handled by [React Query](https://tanstack.com/query/latest), providing powerful data-fetching and caching capabilities.

## Building for Production

To create a production build:

1. For Android:
   ```bash
   eas build --platform android
   ```

2. For iOS:
   ```bash
   eas build --platform ios
   ```

Note: You need an Expo account and EAS (Expo Application Services) set up for production builds.

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [twrnc Documentation](https://github.com/jaredh159/tailwind-react-native-classnames)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
