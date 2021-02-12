import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/users/userContext';

const SignIn = () => {
	//REDIRECTING
	const history = useHistory();
	//CONTEXT
	const userContext = useContext(UserContext);
	const { logIn } = userContext;
	//LOCAL STATES
	const [ userData, addUserData ] = useState({
		email: '',
		password: ''
	});
	const [ error_mail, switchErrorMail ] = useState(false);
	const [ error_password, switchErrorPassword ] = useState(false);

	const handleChange = (e) => {
		addUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
	const { email, password } = userData;
	//SUBMIT USER
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.trim() === '') {
			switchErrorMail(true);
			setTimeout(() => {
				switchErrorMail(false);
			}, 2000);
			return;
		}
		if (password.trim() === '') {
			switchErrorPassword(true);
			setTimeout(() => {
				switchErrorPassword(false);
			}, 2000);
			return;
		}
		logIn(userData);
		addUserData({
			email: '',
			password: ''
		});
		history.push('/dashboard');
	};

	return (
		<form onSubmit={handleSubmit} className="p-5">
			<div className="field">
				<h3 className="title is-3">Sign In</h3>
			</div>
			<div className="field">
				<label className="label">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input
						className="input is-danger"
						name="email"
						type="email"
						value={email}
						placeholder="Your email"
						onChange={handleChange}
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-envelope" />
					</span>
				</div>
				{error_mail ? <p className="help is-danger">This email is invalid</p> : null}
			</div>
			<div className="field">
				<label className="label">Password</label>
				<div className="control has-icons-left has-icons-right">
					<input
						className="input is-success"
						name="password"
						value={password}
						type="password"
						onChange={handleChange}
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-key" />
					</span>
				</div>
				{error_password ? <p className="help is-danger">This password is not available</p> : null}
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						SIGN IN
					</button>
				</div>
			</div>
		</form>
	);
};

export default SignIn;
