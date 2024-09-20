import React, { Fragment, useState } from "react";
import { FaCodeBranch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEducation } from "../../redux/actions/profileAction";

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch">
          <FaCodeBranch />
        </i>{" "}
        Add educations you have had.
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault()
        dispatch(addEducation(formData, navigate))
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School name"
            name="school"
            value={school}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            value={degree}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Currently Studying
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => handleOnChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => handleOnChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddEducation;
