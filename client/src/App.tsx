import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import AdminPage from './components/pages/AdminPage';
import CasesPage from './components/pages/CasesPage';
import HelpPage from './components/pages/HelpPage';
import { useAppDispatch } from './components/hooks/reduxHooks';
import { checkUserThunk } from './redux/auth/authActionThunk';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/signin',
          element: <SignInPage />,
        },
        {
          path: '/signup',
          element: <SignUpPage />,
        },
        {
          path: '/cases',
          element: <CasesPage />,
        },
        {
          path: '/help',
          element: <HelpPage />,
        },
        {
          path: 'adminiem7disk',
          element: <AdminPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

