import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Apply from './pages/Apply';
import AuditionPostDetailPage, {
  loader as auditionPostDetailLoader,
} from './pages/AuditionPostDetailPage';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import UserSearchPage from './pages/UserSearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TitleAndDescriptionPage from './pages/TitleAndDescriptionPage';
import TalentsPage from './pages/TalentsPage';
import OthersPage from './pages/OthersPage';
import AuditionPostSearchPage from './pages/AuditionPostSearchPage';
import RecentPostsPage from './pages/RecentPostsPage';
import PersonalizedPostsPage, {
  loader as personalizedPostsPageLoader,
} from './pages/PersonalizedPostsPage';

const store = configureStore();

const element: HTMLElement = document.getElementById('root') as HTMLElement;

const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Authenticated Component={Homepage} />,
      children: [
        {
          children: [
            { index: true, element: <RecentPostsPage /> },
            {
              path: '/recent',
              element: <RecentPostsPage />,
            },
            {
              path: '/for-you',
              loader: personalizedPostsPageLoader(queryClient),
              element: <PersonalizedPostsPage />,
            },
          ],
        },
      ],
    },
    {
      path: '/post/title-description',
      element: <Authenticated Component={TitleAndDescriptionPage} />,
    },
    {
      path: '/post/talents',
      element: <Authenticated Component={TalentsPage} />,
    },
    {
      path: '/post/others',
      element: <Authenticated Component={OthersPage} />,
    },
    {
      path: '/auditions/:id',
      element: <Authenticated Component={AuditionPostDetailPage} />,
      loader: auditionPostDetailLoader(queryClient),
    },
    {
      path: '/auditions/:id/apply',
      element: <Authenticated Component={Apply} />,
    },
    {
      path: '/profile/:id',
      element: <Authenticated Component={Profile} />,
    },
    {
      path: '/users',
      element: <Authenticated Component={UserSearchPage} />,
    },
    {
      path: '/auditionposts',
      element: <Authenticated Component={AuditionPostSearchPage} />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);

const root = ReactDOM.createRoot(element);
const queryClient = new QueryClient();
const dataRouter = router(queryClient);
root.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={dataRouter} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

{
  /* <Routes>
        <Route path="/squares" element={<Squares />} />
        <Route path="/" element={<Authenticated Component={Homepage} />}>
          <Route path="/recent" element={<RecentPostsPage />} />
          <Route path="/for-you" element={<Personalized />} />
        </Route>

        <Route
          path="/post/title-description"
          element={<Authenticated Component={TitleAndDescriptionPage} />}
        />
        <Route
          path="/post/talents"
          element={<Authenticated Component={TalentsPage} />}
        />
        <Route
          path="/post/others"
          element={<Authenticated Component={OthersPage} />}
        />
        <Route
          path="/auditions/:id"
          element={<Authenticated Component={AuditionPostDetailPage} />}
          loader={auditionPostDetailLoader(queryClient.current)}
        />
        <Route
          path="/auditions/:id/apply"
          element={<Authenticated Component={Apply} />}
        />
        <Route
          path="/profile/:id"
          element={<Authenticated Component={Profile} />}
        />
        <Route
          path="/users"
          element={<Authenticated Component={UserSearchPage} />}
        />
        <Route
          path="/auditionposts"
          element={<Authenticated Component={AuditionPostSearchPage} />}
        /> */
}
{
  /* <Route path="/checkbox" element={<Checkbox />} /> */
}
{
  /* 
        <Route path="/hh" element={<Authenticated Component={HH} />} />


        <Route
          path="/admin"
          element={<AdminRole Component={AdminUsersList} />}
        />
        <Route
          path="/admin/posts"
          element={<AdminRole Component={AdminPostsList} />}
        />
        <Route
          path="/admin/applications"
          element={<AdminRole Component={AdminApplicationsList} />}
        />
        <Route
          path="/adminpage"
          element={<AdminRole Component={AdminPage} />}
        />
        <Route path="/mark" element={<Mark />} />
        <Route path="/chat" element={<ChatPage />} />*/
}

{
  /* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */
}
