import React, { Fragment } from "react";
import { FaCheck } from "react-icons/fa"

const ProfileAbout = ({ profile: { user: {name}, bio, skills } }) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}

      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
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
