import { Route, Routes } from 'react-router-dom';
// import AdminApplicationsList from './components/Admin/AdminApplicationsList';
// import AdminPage from './components/Admin/AdminPage';
// import AdminPostsList from './components/Admin/AdminPostsList';
// import AdminUsersList from './components/Admin/AdminUsersList';
// import AdminRole from './components/AdminRole';
import Authenticated from './components/Authenticated';
// import Apply from './pages/Apply';
// import AuditionPostDetailPage from './pages/AuditionPostDetailPage';
// import AuditionPostSearchPage from './pages/AuditionPostSearchPage';
// import ChatPage from './pages/ChatPage';
// import Checkbox from './pages/Checkbox';
// import HH from './pages/HH';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
// import Mark from './pages/Markdown';
// import OthersPage from './pages/OthersPage';
// import Post from './pages/Post';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
// import TalentsPage from './pages/TalentsPage';
// import TitleAndDescriptionPage from './pages/TitleAndDescriptionPage';
// import UserSearchPage from './pages/UserSearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import Header from './components/Header';
import TitleAndDescriptionPage from './pages/TitleAndDescriptionPage';
import TalentsPage from './pages/TalentsPage';
import OthersPage from './pages/OthersPage';

function App() {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Header />

      <Routes>
        <Route path="/" element={<Authenticated Component={Homepage} />} />

        <Route
          path="/post/title-description"
          element={<TitleAndDescriptionPage />}
        />
        <Route path="/post/talents" element={<TalentsPage />} />
        <Route path="/post/others" element={<OthersPage />} />
        {/* <Route
          path="/profile/:id"
          element={<Authenticated Component={Profile} />}
        />
        <Route path="/hh" element={<Authenticated Component={HH} />} />

        <Route
          path="/auditions/:id"
          element={<Authenticated Component={AuditionPostDetailPage} />}
        />

        <Route
          path="/auditions/:id/apply"
          element={<Authenticated Component={Apply} />}
        />
        <Route path="/checkbox" element={<Checkbox />} />
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
        <Route path="/users" element={<UserSearchPage />} />
        <Route path="/mark" element={<Mark />} />
        <Route path="/auditionposts" element={<AuditionPostSearchPage />} />
        <Route path="/chat" element={<ChatPage />} />*/}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
