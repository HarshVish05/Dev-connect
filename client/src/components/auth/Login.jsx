import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()

  const { email, password } = formData;

  const submitHandler = async(e) => {
    e.preventDefault()

    dispatch(login(email, password))
    
  }

  if(isAuthenticated){
    navigate('/dashboard')
  }

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"><FaUser/></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          New User? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
