import React from 'react';

const Footer = () => {
	return (
		<footer className="footer has-background-dark has-text-white">
			<div className="columns is-mobile">
				<div className="column is-offset-1 is-5-mobile has-text-centered is-size-6">
					<p>EXEQUIEL SOTO</p>
				</div>
				<div className="column is-6-mobile has-text-centered">
					<div className="columns">
						<div className="column">
							<i className="fab fa-github-square ml-2" />
							<i className="fab fa-linkedin ml-2" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
