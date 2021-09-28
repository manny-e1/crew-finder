import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminApplicationsList from './components/Admin/AdminApplicationsList';
import AdminPostsList from './components/Admin/AdminPostsList';
import AdminUsersList from './components/Admin/AdminUsersList';
import AdminRole from './components/AdminRole';
import Authenticated from './components/Authenticated';
import Apply from './pages/Apply';
import AuditionPostDetailPage from './pages/AuditionPostDetailPage';
import AuditionPostSearchPage from './pages/AuditionPostSearchPage';
import ChatPage from './pages/ChatPage';
import Checkbox from './pages/Checkbox';
import HH from './pages/HH';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import OthersPage from './pages/OthersPage';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import TalentsPage from './pages/TalentsPage';
import TitleAndDescriptionPage from './pages/TitleAndDescriptionPage';
import UserSearchPage from './pages/UserSearchPage';

function App() {
  return (
    <Router>
      <main className="">
        <Route exact path="/">
          <Authenticated Component={Homepage} />
        </Route>
        <Route exact path="/profile/:id">
          <Authenticated Component={Profile} />
        </Route>
        <Route exact path="/post">
          <Authenticated Component={Post} />
        </Route>
        <Route exact path="/hh">
          <Authenticated Component={HH} />
        </Route>
        <Route exact path="/auditions/:id">
          <Authenticated Component={AuditionPostDetailPage} />
        </Route>
        <Route exact path="/auditions/:id/apply">
          <Authenticated Component={Apply} />
        </Route>
        <Route path="/checkbox" component={Checkbox} exact />
        <Route
          path="/post/title-description"
          component={TitleAndDescriptionPage}
          exact
        />
        <Route exact path="/admin">
          <AdminRole Component={AdminUsersList} />
        </Route>
        <Route exact path="/admin/posts">
          <AdminRole Component={AdminPostsList} />
        </Route>
        <Route exact path="/admin/applications">
          <AdminRole Component={AdminApplicationsList} />
        </Route>
        <Route path="/users" component={UserSearchPage} exact />
        <Route path="/auditionposts" component={AuditionPostSearchPage} exact />
        <Route path="/chat" component={ChatPage} exact />
        <Route path="/post/others" component={OthersPage} exact />
        <Route path="/post/talents" component={TalentsPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
      </main>
    </Router>
  );
}

export default App;
