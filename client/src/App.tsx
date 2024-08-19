import React from 'react';
import { createBrowserRouter, RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import Layout from './components/Layout';



function App(): JSX.Element {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <MainPage/>,
        },
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
