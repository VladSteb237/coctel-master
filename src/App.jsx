import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError />,
        element: <Landing />
      },
      {
        path: 'cocktail/:id',
        loader: singleCocktailLoader(queryClient),
        errorElement: <SinglePageError />,
        element: <Cocktail />
      },
      {
        path: 'newsletter',
        action: newsletterAction,
        errorElement: <SinglePageError />,
        element: <Newsletter />
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
