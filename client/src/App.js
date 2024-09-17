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
          <Route exact path="/" element={<Landing />} />

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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
