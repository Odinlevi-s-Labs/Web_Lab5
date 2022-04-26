import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Navigate to='/dashboard' /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to='/dashboard' /> : <Login />} />
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/create-post' element={user ? <CreatePost /> : <Navigate to='/login' />} />
          <Route path='/post/:postId' element={user ? <Post /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
