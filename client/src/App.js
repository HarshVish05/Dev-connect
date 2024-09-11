import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
