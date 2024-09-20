import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../redux/actions/profileAction";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { FaGithub } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profile, loading } = useSelector((state) => state.profile);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileById(params.id));
  }, [dispatch, params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          profile
          <Link to={"/profiles"} className="btn btn-light">
            Back to Profiles
          </Link>
          {isAuthenticated &&
            loading === false &&
            user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      experience={experience}
                      key={experience._id}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4> No experience </h4>
              )}
            </div>

            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4> No education credentials </h4>
              )}
            </div>
            {profile.githubusername && (
              <div class="profile-github">
                <h2 class="text-primary my-1">
                  <i class="fab fa-github"><FaGithub/></i> Github Repos
                </h2>
                
                  <ProfileGithub username={profile.githubusername}/>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
