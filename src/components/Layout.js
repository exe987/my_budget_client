import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import EntryForm from "./EntryForm";
import Dashboard from "./Dashboard";
import PrivateRoute from "../routes/PrivateRoute";

const Layout = () => {
  return (
    <Router>
      <Header />
      <div className="container has-background-warning is-fluid mt-6">
        <Switch>
          <Route exact path="/" component={EntryForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default Layout;
