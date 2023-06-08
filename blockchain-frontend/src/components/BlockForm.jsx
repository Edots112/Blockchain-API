import React, { useState } from "react";
import axios from "axios";

const BlockForm = ({ onNewBlock }) => {
	const [data, setData] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:5000/api/v1/blocks", { data });

			alert("Block tillagt!");
			onNewBlock();
			setData("");
		} catch (error) {
			console.error(error);
			alert("Vänligen fyll i data...");
		}
	};

	return (
		<>
			<h2 className='form-heading'>Add Block</h2>
			<form
				className='form'
				onSubmit={handleSubmit}>
				<input
					placeholder='Enter data...'
					type='text'
					value={data}
					onChange={(e) => setData(e.target.value)}
				/>
				<button type='submit'>Add Block</button>
			</form>
		</>
	);
};

export default BlockForm;
