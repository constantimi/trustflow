TrustFlow Multi-Step Insurance Policy Form
================================================

This project implements a multi-step form for registering and choosing an insurance policy. The form is built using **React** and features navigation between steps, form validation, and a summary screen. The app runs as both a web application and an Electron-based desktop app, showcasing its multi-cross-platform capabilities.

Features
--------

-   **Multi-step Form**: Users can fill in their personal information and choose between three insurance plans: Basic, Standard, and Premium.
-   **Dynamic Form Validation**: Real-time validation with clear error messages ensures all fields are correctly filled before proceeding to the next step.
-   **Form Auto-Save / Persistence**: The form auto-saves progress using local storage, allowing users to resume later.
-   **Custom Axios Client**: Simplified API requests with a centralized Axios client for managing interactions.
-   **Custom Async Thunk**: Built-in asynchronous logic with Redux Thunk to handle complex flows.
-   **Lazy Loading and Suspense**: Lazy loading for components improves performance, using React's Suspense API.
-   **Modular Component Design**: The application follows a modular design to enhance separation of concerns and reusability of components.
-   **Translations**: Multi-language support for a better user experience.

Installation and Running the Project
------------------------------------

### 1\. Install dependencies

To install all the necessary packages, run the following command:

`npm install`

### 2\. Running the Application

You can run both the **web application** and the **Electron application** with the following command:

`npm run start`

This command will:

-   Start the **React** application in the development mode.
-   Build and run the **Electron** desktop app simultaneously using Vite.

The project is configured to run as a **multi-cross platform** application, where the same codebase supports both web and desktop environments.

Testing
-------

The project includes unit and component tests to ensure correct functionality. To run the tests:

`npm run test`

Contributions
-------------

Feel free to open issues and pull requests to improve the project!