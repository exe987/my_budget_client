import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/users/userContext';

const Header = () => {
	//REDIRECTING
	const history = useHistory();
	//CONTEXT
	const userContext = useContext(UserContext);
	const { sesion, logOut, dataSesion } = userContext;
	//LOCAL STATE
	const [ isActive, setisActive ] = useState(false);
	return (
		<nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					<span className="title is-2 has-text-white">
						My Budget
						<i className="fas fa-money-check-alt ml-2" />
					</span>
				</a>
				{sesion ? (
					<div className="navbar-start">
						<p className="navbar-item has-background-white ml-5">
							<span className="title is-2 has-text-black"> ${dataSesion.ammount}</span>
						</p>
					</div>
				) : null}
				<a
					onClick={() => {
						setisActive(!isActive);
					}}
					role="button"
					className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>
			<div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
				{sesion ? (
					<div className="navbar-end">
						<a className="navbar-item" onClick={(() => logOut(), () => history.push('/'))}>
							<span>
								CERRAR SESION <i className="fas fa-user-plus" />
							</span>
						</a>
					</div>
				) : null}
			</div>
		</nav>
	);
};

export default Header;
