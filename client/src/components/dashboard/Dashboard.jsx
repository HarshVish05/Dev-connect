import React, { Fragment, useEffect } from "react";
import { deleteAccount, getCurrentProfile } from "../../redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user">
          <FaUser />
        </i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
            <DashboardAction/>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2">
              <button className="btn btn-danger" onClick={()=> dispatch(deleteAccount())}>
                <FaUserMinus/>{' '}
                Delete My Account
              </button>
            </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet created a profile, please add some info.</p>
          <Link to={'/create-profile'} className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
