import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({
  education: {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
  },
}) => {
  return (
    <div>
      <h3 class="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p><strong>Degree: </strong>{degree}</p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
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

export default ProfileEducation;
