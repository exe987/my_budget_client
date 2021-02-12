import React, { useState, useContext } from 'react';
import UserContext from '../context/users/userContext';

const SignUp = () => {
	//CONTEXT
	const userContext = useContext(UserContext);
	const { createUser } = userContext;
	//LOCAL STATES
	const [ userData, addUserData ] = useState({
		name: '',
		email: '',
		password: '',
		password_repeat: ''
	});
	const [ name_invalid, switchErrorNameInvalid ] = useState(false);
	const [ error_mail_invalid, switchErrorMailInvalid ] = useState(false);
	const [ error_password_availability, switchErrorPasswordAvailability ] = useState(false);
	const [ error_password_doesntmatch, switchErrorPasswordDoesntmatch ] = useState(false);

	const handleChange = (e) => {
		addUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
	const { name, email, password, password_repeat } = userData;
	//SUBMIT USER
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.trim() === '') {
			switchErrorNameInvalid(true);
			setTimeout(() => {
				switchErrorNameInvalid(false);
			}, 2000);
			return;
		}
		if (email.trim() === '') {
			switchErrorMailInvalid(true);
			setTimeout(() => {
				switchErrorMailInvalid(false);
			}, 2000);
			return;
		}
		if (password.trim() === '') {
			switchErrorPasswordAvailability(true);
			setTimeout(() => {
				switchErrorPasswordAvailability(false);
			}, 2000);
			return;
		}
		if (password_repeat.trim() === '' || password !== password_repeat) {
			switchErrorPasswordDoesntmatch(true);
			setTimeout(() => {
				switchErrorPasswordDoesntmatch(false);
			}, 2000);
			return;
		}
		createUser(userData);
		addUserData({
			name: '',
			email: '',
			password: '',
			password_repeat: ''
		});
	};

	return (
		<form className="p-5" onSubmit={handleSubmit}>
			<div className="field">
				<h3 className="title is-3">Create an account</h3>
			</div>
			<div className="field">
				<label className="label">Name</label>
				<div className="control has-icons-left">
					<input className="input" type="text" value={name} name="name" placeholder="Your name" onChange={handleChange} />
					<span className="icon is-small is-left">
						<i className="fas fa-user" />
					</span>
				</div>
				{name_invalid ? <p className="help is-danger">This name is invalid</p> : null}
			</div>
			<div className="field">
				<label className="label">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input
						className="input is-danger"
						value={email}
						name="email"
						type="email"
						placeholder="Your email"
						onChange={handleChange}
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-envelope" />
					</span>
				</div>
				{error_mail_invalid ? <p className="help is-danger">This email is invalid</p> : null}
			</div>
			<div className="field">
				<label className="label">Password</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input is-success" value={password} name="password" type="password" onChange={handleChange} />
					<span className="icon is-small is-left">
						<i className="fas fa-key" />
					</span>
				</div>
				{error_password_availability ? <p className="help is-danger">This password is not available</p> : null}
			</div>
			<div className="field">
				<label className="label">Repeat password</label>
				<div className="control has-icons-left has-icons-right">
					<input
						className="input is-success"
						value={password_repeat}
						name="password_repeat"
						type="password"
						onChange={handleChange}
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-key" />
					</span>
				</div>
				{error_password_doesntmatch ? <p className="help is-danger">This password does not match</p> : null}
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						SIGN UP
					</button>
				</div>
			</div>
		</form>
	);
};

export default SignUp;
