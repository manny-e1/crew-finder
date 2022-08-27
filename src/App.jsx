import { Route, Routes } from 'react-router-dom';
// import AdminApplicationsList from './components/Admin/AdminApplicationsList';
// import AdminPage from './components/Admin/AdminPage';
// import AdminPostsList from './components/Admin/AdminPostsList';
// import AdminUsersList from './components/Admin/AdminUsersList';
// import AdminRole from './components/AdminRole';
import Authenticated from './components/Authenticated';
import Apply from './pages/Apply';
import AuditionPostDetailPage, {
  loader as auditionPostDetailLoader,
} from './pages/AuditionPostDetailPage';
// import AuditionPostSearchPage from './pages/AuditionPostSearchPage';
// import ChatPage from './pages/ChatPage';
import Checkbox from './pages/Checkbox';
// import HH from './pages/HH';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
// import Mark from './pages/Markdown';
// import Post from './pages/Post';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import UserSearchPage from './pages/UserSearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Header from './components/Header';
import TitleAndDescriptionPage from './pages/TitleAndDescriptionPage';
import TalentsPage from './pages/TalentsPage';
import OthersPage from './pages/OthersPage';
import { set } from 'date-fns';

function App() {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Header />

      <Routes>
        <Route path="/squares" element={<Squares />} />
        <Route path="/" element={<Authenticated Component={Homepage} />} />

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
          loader={auditionPostDetailLoader(queryClient)}
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
        <Route path="/checkbox" element={<Checkbox />} />
        {/* 
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
        <Route path="/auditionposts" element={<AuditionPostSearchPage />} />
        <Route path="/chat" element={<ChatPage />} />*/}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

const sett = new Set();
function Squares() {
  const [squares, setSquares] = useState([0, 0, 0, 0, 0, 0]);

  const turnWhite = async () => {
    if (sett.size === 0 && !squares.includes(1)) return;
    const last = Array.from(sett).pop();
    let newSquares = squares;
    newSquares[last] = 0;
    sett.delete(last);
    setTimeout(() => {
      setSquares([...newSquares]);
      turnWhite();
    }, 500);
  };

  const turnGreen = (index) => {
    if (!squares.includes(0)) return;
    sett.add(index);
    let newSquares = squares;
    newSquares[index] = 1;
    setSquares([...newSquares]);
    if (squares.every((s) => s === 1)) {
      turnWhite();
    }
  };

  return (
    <div className="flex justify-around">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`h-32 w-32 gap-2  ${
            square === 1 && 'bg-green-500'
          } border border-black `}
          onClick={(e) => turnGreen(index)}
        ></div>
      ))}
    </div>
  );
}
