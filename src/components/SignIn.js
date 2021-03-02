import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";
import AlertContext from "../context/alerts/alertContext";

const SignIn = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { logIn, msgs } = userContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  //LOCAL STATES
  const [userData, addUserData] = useState({
    email: "",
    password: "",
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
  const { email, password } = userData;
  //SUBMIT USER
  const handleSubmit = (e) => {
    e.preventDefault();
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
    logIn(userData);
    addUserData({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      {alert ? (
        <p className="title has-text-white is-5 is-danger has-background-danger">
          {" "}
          {alert.toUpperCase()}{" "}
        </p>
      ) : null}
      <div className="field">
        <h3 className="title is-3">Sign In</h3>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger"
            name="email"
            type="email"
            value={email}
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
            name="password"
            value={password}
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
            SIGN IN
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
