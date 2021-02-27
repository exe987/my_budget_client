import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";

const Header = () => {
  //REDIRECTING
  const history = useHistory();
  //CONTEXT
  const userContext = useContext(UserContext);
  const { sesion, logOut, dataSesion } = userContext;
  const transactionContext = useContext(TransactionContext);
  const { budget } = transactionContext;
  //LOCAL STATE
  const [isActive, setisActive] = useState(false);
  const toLogOut = () => {
    logOut();
    history.push("/");
  };
  return (
    <nav
      className="navbar is-dark is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <span className="title is-3 has-text-white">
            My Budget
            <i className="fas fa-money-check-alt ml-2" />
          </span>
        </div>

        {sesion ? (
          <>
            <div className="navbar-start">
              <p className="navbar-item ml-1">
                <span className="title is-3 has-text-white">${budget}</span>
              </p>
            </div>
            <a
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </>
        ) : null}
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        {sesion ? (
          <div className="navbar-end">
            <a className="navbar-item" onClick={() => toLogOut()}>
              <span>
                SIGN OUT <i className="fas fa-sign-out-alt"></i>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
