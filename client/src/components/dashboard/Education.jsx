import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../redux/actions/profileAction";

const Education = ({ education }) => {
    const dispatch = useDispatch()
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " NOW"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button onClick={()=> dispatch(deleteEducation(edu._id))} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
