
---

# RoomList

This is a simple and elegant To-Do List application built with React, PocketBase, and TailwindCSS. The app allows users to manage their tasks efficiently and with ease.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **PocketBase**: A lightweight backend for storing and managing tasks.
- **TailwindCSS**: A utility-first CSS framework for designing a responsive and clean UI.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- A running instance of PocketBase (see [PocketBase Documentation](https://pocketbase.io/docs/) for setup details).

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BenjaminCorona/roomlist-app.git
   cd roomlist-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add the following:

   ```bash
   REACT_APP_POCKETBASE_URL='http://127.0.0.1:8090'
   REACT_APP_POCKETBASE_HOST_URL='HOST_NAME'
   
   ```

   Replace `http://127.0.0.1:8090` with your PocketBase server URL.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

## Deployment

To deploy the app, follow these steps:

1. **Build the app:**

   ```bash
   npm run build
   ```

2. **Serve the build:**

   You can serve the built app using any static site hosting service or a Node.js server.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [PocketBase](https://pocketbase.io/)
- [TailwindCSS](https://tailwindcss.com/)

