import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EntryForm from './EntryForm';
import Dashboard from './Dashboard';

const Layout = () => {
	return (
		<Router>
			<Header />
			<div className="container is-fluid has-background-warning-light mt-6">
				<Switch>
					<Route exact path="/">
						<EntryForm />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
				</Switch>
			</div>
			<Footer />
		</Router>
	);
};

export default Layout;
