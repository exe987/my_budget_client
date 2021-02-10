import React, { useState } from 'react';

const Header = (sesion) => {
	const [ isActive, setisActive ] = useState(false);
	return (
		<nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					<span className="title is-2 has-text-white">
						My Budget
						{sesion ? <span> is:</span> : <i class="fas fa-money-check-alt" />}
					</span>
				</a>
				{sesion ? (
					<div className="navbar-start">
						<p className="navbar-item has-background-white ml-5">
							<span className="title is-2 has-text-black">$100</span>
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
						<a className="navbar-item">
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
