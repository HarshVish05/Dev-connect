import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/dashboard')
    }
  },[isAuthenticated, navigate])
  
  return (
    <div>
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Landing