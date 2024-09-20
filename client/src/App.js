import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken.js";
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./redux/actions/authAction.js";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PrivateRoute from "./components/routing/PrivateRoute.jsx";
import CreateProfile from "./components/profile-form/CreateProfile.jsx";
import EditProfile from "./components/profile-form/EditProfile.jsx";
import AddExperience from "./components/profile-form/AddExperience.jsx";
import AddEducation from "./components/profile-form/AddEducation.jsx";
import Profiles from "./components/profiles/Profiles.jsx";
import Profile from "./components/profile/Profile.jsx";



if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div>
      <Router>
        <Navbar />
        <section className="container">

          <Alert/>
        </section>
        <Routes>
          <Route  path="/" element={<Landing />} />
          <Route  path="/profiles" element={
              <section className="container">
                <Profiles />
              </section>
            } />
          <Route  path="/profile/:id" element={
              <section className="container">
                <Profile />
              </section>
            } />

          {/* Authentication */}
          <Route
            path="/login"
            element={
              <section className="container">
                <Login />
              </section>
            }
          />

          <Route
            path="/register"
            element={
              <section className="container">
                <Register />
              </section>
            }
          />
        {/* Protected Routes */}
          <Route element={<PrivateRoute/>}>
            <Route
            path="/dashboard"
            element={
              <section className="container">
                <Dashboard />
              </section>
            }
          />
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route
            path="/create-profile"
            element={
              <section className="container">
                <CreateProfile />
              </section>
            }
          />
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route
            path="/edit-profile"
            element={
              <section className="container">
                <EditProfile />
              </section>
            }
          />
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route
            path="/add-experience"
            element={
              <section className="container">
                <AddExperience />
              </section>
            }
          />
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route
            path="/add-education"
            element={
              <section className="container">
                <AddEducation />
              </section>
            }
          />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
