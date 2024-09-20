import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: {
    title,
    company,
    from,
    to,
    description,
  },
}) => {
  return (
    <div>
      <h3 class="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

export default ProfileExperience;
