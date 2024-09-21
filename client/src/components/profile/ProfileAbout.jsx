import React, { Fragment } from "react";
import { FaCheck } from "react-icons/fa"

const ProfileAbout = ({ profile: { user: {name}, bio, skills } }) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {
            skills.map((skill, index)=> (
                <div className="p-1" key={index}>
                    <FaCheck/>{' '}{skill}
                </div>
            ))
        }
        
      </div>
    </div>
  );
};

export default ProfileAbout;
