import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react';
import './App.css';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HomeAdmin from './pages/HomeAdmin';
import Loading from './components/Loading';
import UploadFile from './pages/UploadFile';
import OutletData from './pages/OutletData';


function App() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const role = user ? user.role : '';
  const [isLoading, setLoading] = useState(true);

  // console.log(user);


  const isAdmin = (user) => user && role === 'admin';

  useEffect(() => {
    setLoading(false); // Set loading to false once the component is fully loaded
  }, []);

  return (
    <>
      {isLoading ? (
        <div><Loading /></div> // Show a loading screen while the component is loading
      ) : (
        <>

          {user && pathname !== '/login' && <Navbar />}
          <div >
            <Routes>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : isAdmin(user) ? (
                    <HomeAdmin />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route
                path="/uploadFile"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : isAdmin(user) ? (
                    <Navigate to="/" />
                    ) : (
                    <UploadFile />
                  )
                }
              />
              <Route
                path="/outlet/:id"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : isAdmin(user) ? (
                    <Navigate to="/" />
                    ) : (
                    <OutletData />
                  )
                }
              />
              {/* <Route
                path="/submissions"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : isAdmin(user) ? (
                    <Submissions />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              /> */}
              {/* <Route
                path="/details"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : !isAdmin(user) ? (
                    <ProductDetails />
                  ) : (
                    <Navigate to="/" />
                  )
                  
                }
              />
              <Route
                path="/submission/:id"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : isAdmin(user) ? (
                    <Submission />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              /> */}
              <Route
                path="*"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
