# Cheerio Frontend

Cheerio is a mental health application built using **React** and **Tailwind CSS**. This repository contains the frontend code for the project, located inside the `frontend` folder.

## 🚀 Features

- Modern UI built with **React** and **Tailwind CSS**
- State management with **React Hooks**
- API communication with **Axios**
- Component-based architecture for scalability
- Fully responsive design

## 📂 Project Structure

```
Cheerio/
  ├── frontend/
  │   ├── src/
  │   │   ├── components/  # Reusable UI components
  │   │   ├── pages/       # Different application pages
  │   │   ├── assets/      # Images, icons, styles
  │   │   ├── App.js       # Main application component
  │   │   ├── index.js     # Entry point
  │   ├── public/          # Static assets
  │   ├── package.json     # Project dependencies
  │   ├── tailwind.config.js # Tailwind configuration
  │   ├── postcss.config.js  # PostCSS configuration
  ├── backend/ (if applicable)
```

## 🛠️ Prerequisites

Make sure you have the following installed before proceeding:

- **Node.js** (v16+ recommended) - [Download here](https://nodejs.org/)
- **npm** (Comes with Node.js) or **yarn**
- **Git** (optional, for version control)

## 🔧 Installation

Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/YashBaviskar1/Cheerio.git
   cd Cheerio/frontend
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```

## 📦 Dependencies

The project uses the following npm packages:

### Core Dependencies:

- **react** - UI library
- **react-dom** - React for the web
- **react-router-dom** - For navigation
- **axios** - API requests

### Styling:

- **tailwindcss** - Utility-first CSS framework
- **postcss** - CSS transformations
- **autoprefixer** - CSS vendor prefixes

### Additional:

- **dotenv** - Manage environment variables

## 🚀 Running the Application

Start the development server with:

```bash
npm run dev  # or yarn dev
```

The app will be available at `http://localhost:3000/`.

## 🔨 Building for Production

To create an optimized production build:

```bash
npm run build  # or yarn build
```

This will generate a `dist/` folder with minified and optimized files.

## 📜 Environment Variables

Create a `.env` file in the `frontend` directory and add:

```
VITE_API_BASE_URL=http://your-backend-url/api
```

Replace `http://your-backend-url/api` with the actual API URL.

## ❓ Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly (`npm install` or `yarn install`).
2. Check the Node.js version (`node -v`).
3. Restart the development server.
4. Verify API endpoints in the `.env` file.

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by **Yash Baviskar**
