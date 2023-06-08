import React, { useState } from "react";
import BlockList from "./components/BlockList";
import BlockForm from "./components/BlockForm";
import Popup from "reactjs-popup";
import "./App.css";

const App = () => {
	const [refreshBlocks, setRefreshBlocks] = useState(false);
	const [isValid, setIsValid] = useState(true);

	const fetchBlocks = () => {
		setRefreshBlocks(!refreshBlocks);
	};

	return (
		<div>
			<BlockForm onNewBlock={fetchBlocks} />
			<BlockList
				refreshBlocks={refreshBlocks}
				setIsValid={setIsValid}
			/>
			<Popup
				open={!isValid}
				closeOnDocumentClick={false}
				contentStyle={{
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(255, 0, 0, 0.9)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "3rem",
					fontWeight: "bold",
				}}>
				<div>Blockkedjan är ogiltig! Någon har manipulerat den.</div>
			</Popup>
		</div>
	);
};

export default App;
