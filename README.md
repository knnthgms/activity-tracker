# Personal Activity Tracker Analytics Web App

## **Overview**

This web application allows users to log their daily personal activities and view analytics for the logged activities. It demonstrates core frontend development skills, basic backend integration (if applicable), and data visualization using **React**, **TypeScript**, and **shadcn** for the UI.

---

## Demo

A live deployed version of the app can be found [here](https://cool-stardust-6d3480.netlify.app/)

---

## **Features**

### **Activity Logging**

- A form to log activities with the following fields:
  - **Activity Name**: (e.g., "Running", "Reading")
  - **Duration**: (in minutes)
  - **Date**: (defaults to today)
- Validation for required fields to ensure proper data entry.

### **Activity List**

- Displays logged activities in a table format with columns:
  - **Activity Name**
  - **Duration**
  - **Date**
- Pagination for large activity lists (to be implemented).

### **Analytics Dashboard**

- Visualizations of activity data, including:
  - Total time spent per activity for a selected date range.
  - Distribution of activity durations across all logged activities using visual insights.

---

## **Technology Stack**

### **Frontend**

- **React** with **TypeScript** for building the app.
- **shadcn** UI components for modern, accessible, and reusable design.
- **Tailwind CSS** for utility-first styling.

---

## **Setup Instructions**

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**: Clone your forked repository locally using the following command:

   ```bash
   git clone https://github.com/knnthgms/activity-tracker.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies.

   ```bash
   cd activity-tracker
   npm install
   ```

3. **Run the Development Server**: Launch the development server to start building your application.

   ```bash
   npm run dev
   ```

4. **Build for Production**: When you're ready to deploy your application, create a production build.

   ```bash
   npm run build
   ```

## Libraries Used

- **axios**: Promise based HTTP client for the browser and node.js.
- **@radix-ui/react-slot**: Component primitives for building unstyled, fully accessible UIs.
- **class-variance-authority**: A utility for managing conditional CSS class variations.
- **clsx**: A tiny utility for constructing className strings conditionally.
- **lucide-react**: A library of simply designed, easily recognizable SVG icons for React.
- **react**: The JavaScript library for building user interfaces.
- **react-dom**: Entry point for React applications to interact with the DOM.
- **tailwind-merge**: Utility functions for merging Tailwind CSS classes.
- **tailwindcss-animate**: A plugin for animating Tailwind CSS classes.

## Development Tools

- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: TypeScript parser for ESLint.
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: A PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: A pluggable linting utility for JavaScript and JSX.
- **eslint-plugin-react-hooks**: ESLint plugin for React hooks.
- **eslint-plugin-react-refresh**: ESLint plugin for React Refresh.
- **postcss**: A tool for transforming styles with JavaScript plugins.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs.
- **typescript**: A superset of JavaScript that adds static types.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Happy coding!** 🚀
