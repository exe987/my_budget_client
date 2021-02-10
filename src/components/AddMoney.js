import React from 'react';

const AddMoney = () => {
	return (
		<div className="column is-12-mobile is-6 has-background-primary-light m-2">
				<form className='column mt-5'>
				<div className="field">
					<p className="title is-3">Add or withdraw money</p>
					<div className="control mt-2">
						<input className="input" type="number" name="add" placeholder="TO ADD" />
						<p className="help is-danger">Please, enter amount to add</p>
					</div>
					<div className="control mt-4">
						<input className="input" type="number" name="withdraw" placeholder="TO WITHDRAW" />
						<p className="help is-danger">Please, enter amount to withdraw</p>
					</div>
				</div>
				<div className="field is-grouped columns m-5 is-centered">
					<div className="control">
						<button className="button is-link ">UPDATE BUDGET</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddMoney;
