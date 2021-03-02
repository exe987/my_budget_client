import React, { useState, useEffect, useContext } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import tokenAuth from "../config/tokenAuth";
import { useHistory } from "react-router-dom";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";
const EntryForm = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { dataSesion, sesion } = userContext;
  const transactionContext = useContext(TransactionContext);
  const { getLastTransactions, getBudget } = transactionContext;

  //REDIRECTING
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && sesion) {
      tokenAuth(token);
      getLastTransactions(dataSesion.id);
      getBudget(dataSesion.id);
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, [sesion]);

  //CHANGE FORM TYPE
  const [form, changeForm] = useState(false);
  const showForm = () => {
    if (form) {
      changeForm(false);
    } else {
      changeForm(true);
    }
  };
  return (
    <section className="section is-medium">
      <div className="columns is-vcentered">
        <div className="column is-6 is-hidden-mobile">
          <figure className="image is-16by12">
            <img src="https://image.freepik.com/vector-gratis/calculadora-billetes-dinero-monedas-sobre-fondo-azul_24908-7088.jpg" />
          </figure>
        </div>
        {form ? (
          <div className="column is-6 has-background-success-light">
            <SignUp changeForm={changeForm} />
            Or<a onClick={() => showForm()}> Sign In to your account</a>
          </div>
        ) : (
          <div className="column is-6 has-background-success-light">
            <SignIn />
            Don't have an account yet?{" "}
            <a onClick={() => showForm()}>Create your account</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default EntryForm;
