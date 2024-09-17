import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alertAction.js";
import { register } from "../../redux/actions/authAction.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()

  const { name, email, password, password2 } = formData;

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== password2){
        console.log('register clicked');
        
        dispatch(setAlert("Passwords do not match", 'danger'));
    }else{
        dispatch(register({name, email, password}))
    }
  }

  if(isAuthenticated){
    navigate('/dashboard')
  }

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"><FaUser/></i> Create Your Account
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            //   required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            //   required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
            //   minLength="6"
              value={password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
            //   minLength="6"
              value={password2}
              onChange={e => setFormData({...formData, password2: e.target.value})}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
