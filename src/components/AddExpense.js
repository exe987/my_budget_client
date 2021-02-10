import React from 'react';

const AddExpense = () => {
	return (
		<div className="column is-12-mobile is-6 has-background-danger-light m-2">
			<p className="title is-3">Add expenses</p>
			<form>
				<div className="field">
					<label className="label">AMOUNT</label>
					<div className="control">
						<input className="input" type="number" />
					</div>
					<p className="help is-danger">Please, enter amount</p>
				</div>
				<div className="field">
					<label className="label">EXPENSE TYPE</label>
					<div className="control">
						<div className="select">
							<select>
								<option>Select </option>
								<option>Workout</option>
								<option>Transportation</option>
								<option>Family</option>
								<option>Gifts</option>
								<option>Education</option>
								<option>Home</option>
							</select>
						</div>
					</div>
					<p className="help is-danger">Please, enter expense type</p>
				</div>
				<div className="field">
					<label className="label">DATE</label>
					<div className="control">
						<input type="date" />
					</div>
					<p className="help is-danger">Please, enter date</p>
				</div>
				<div className="field is-grouped columns m-5 is-centered">
					<div className="control">
						<button className="button is-link">ADD EXPENSE +</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddExpense;
