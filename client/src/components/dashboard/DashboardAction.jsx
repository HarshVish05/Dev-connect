import React from 'react'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaBlackTie, FaUserEdit } from "react-icons/fa";

const DashboardAction = () => {
  return (
    <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"><FaUserEdit/></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"><FaBlackTie/></i> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"><FaGraduationCap/></i> Add Education</Link>
      </div>
  )
}

export default DashboardAction