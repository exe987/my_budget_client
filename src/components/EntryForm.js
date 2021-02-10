import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
const EntryForm = () => {
	//CHANGE FORM TYPE
	const [ form, changeForm ] = useState(false);
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
						<SignUp />
						Or<a onClick={() => showForm()}> Sign In to your account</a>
					</div>
				) : (
					<div className="column is-6 has-background-success-light">
						<SignIn />
						Don't have an account yet? <a onClick={() => showForm()}>Create your account</a>
					</div>
				)}
			</div>
		</section>
	);
};

export default EntryForm;
