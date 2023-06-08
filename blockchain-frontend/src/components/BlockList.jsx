import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockList = ({ refreshBlocks, setIsValid }) => {
	const [blocks, setBlocks] = useState([]);

	const getBlocks = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/v1/blocks");
			setBlocks(response.data.blockchain);
			setIsValid(response.data.isValid);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getBlocks();
	}, [refreshBlocks]);

	return (
		<div className='block-list'>
			{blocks.map((block, index) => (
				<div
					className='block-item'
					key={index}>
					<p>
						<strong>Index:</strong>
						{index}
					</p>
					<p>
						<strong>Timestamp:</strong> {block.timestamp}
					</p>
					<p>
						<strong>Hash:</strong> {block.hash}
					</p>
					<p>
						<strong>Data:</strong> {block.data}
					</p>
					<p>
						<strong>Previous Hash:</strong> {block.lastHash}
					</p>
				</div>
			))}
		</div>
	);
};

export default BlockList;
