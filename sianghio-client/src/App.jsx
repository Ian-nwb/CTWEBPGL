import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
// HomePage Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';
// Dashboard Structure
import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme();

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "dashboard/",
        element: <DashLayout />,
        errorElement: <NotFoundPage />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "articles",
            element: <DashArticleListPage />,
          },
          {
            path: "reports",
            element: <ReportsPage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;