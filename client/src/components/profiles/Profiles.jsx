import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../redux/actions/profileAction";
import Spinner from "../layout/Spinner";
import { FaConnectdevelop } from "react-icons/fa";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop">
              <FaConnectdevelop />
            </i>
            Browse and connect with Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No profiles found </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
