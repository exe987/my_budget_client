import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";
import AlertContext from "../context/alerts/alertContext";

const SignUp = ({ changeForm }) => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { msgs, createUser } = userContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  //LOCAL STATES
  const [userData, addUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_repeat: "",
  });

  //SHOW ERROR VALIDATOR
  useEffect(() => {
    if (msgs) {
      showAlert(msgs[0].msg);
    }
  }, [msgs]);

  const handleChange = (e) => {
    addUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const { name, email, password, password_repeat } = userData;
  //SUBMIT USER
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      showAlert("Name is required");
      return;
    }
    if (email.trim() === "") {
      showAlert("Email is required");
      return;
    }
    if (password.trim() === "") {
      showAlert("Password is required");
      return;
    }
    if (password.length < 6) {
      showAlert("Password must be 6 characters");
      return;
    }
    if (password_repeat.trim() === "" || password !== password_repeat) {
      showAlert("Passwords does not match");
      return;
    }
    createUser(userData);
    addUserData({
      name: "",
      email: "",
      password: "",
      password_repeat: "",
    });
    changeForm(false);
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      {alert ? (
        <p className="title has-text-white is-5 is-danger has-background-danger">
          {" "}
          {alert.toUpperCase()}{" "}
        </p>
      ) : null}
      <div className="field">
        <h3 className="title is-3">Create an account</h3>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            value={name}
            name="name"
            placeholder="Your name"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger"
            value={email}
            name="email"
            type="email"
            placeholder="Your email"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-success"
            value={password}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Repeat password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-success"
            value={password_repeat}
            name="password_repeat"
            type="password"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key" />
          </span>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
