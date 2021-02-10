import React from 'react';

const SignUp = () => {
	return (
		<form className="p-5">
			<div className="field">
				<h3 className="title is-3">Create an account</h3>
			</div>
			<div className="field">
				<label className="label">Name</label>
				<div className="control has-icons-left">
					<input className="input" type="text" placeholder="Your name" />
					<span className="icon is-small is-left">
						<i className="fas fa-user" />
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input is-danger" type="email" placeholder="Your email" />
					<span className="icon is-small is-left">
						<i className="fas fa-envelope" />
					</span>
				</div>
				<p className="help is-danger">This email is invalid</p>
			</div>
			<div className="field">
				<label className="label">Password</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input is-success" type="password" />
					<span className="icon is-small is-left">
						<i class="fas fa-key" />
					</span>
				</div>
				<p className="help is-danger">This password is not available</p>
			</div>
			<div className="field">
				<label className="label">Repeat password</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input is-success" type="text" />
					<span className="icon is-small is-left">
						<i class="fas fa-key" />
					</span>
				</div>
				<p className="help is-danger">This password does not match</p>
			</div>

			<div className="field is-grouped">
				<div className="control">
					<button className="button is-link">SIGN UP</button>
				</div>
			</div>
		</form>
	);
};

export default SignUp;
