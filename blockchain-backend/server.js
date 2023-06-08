const express = require("express");
const dotenv = require("dotenv");
const Block = require("./block");
const Blockchain = require("./blockchain");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const app = express();
const blockchain = new Blockchain();

app.use(express.json());

app.use(cors());

blockchain.addBlock("Block 2");
blockchain.addBlock("Block 3");

app.get("/api/v1/blocks", (req, res) => {
	if (blockchain.chain.length > 1) {
		res.status(200).json({
			blockchain: blockchain.chain,
			isValid: blockchain.isChainValid(),
		});
	} else {
		res.status(204).end();
	}
});

app.post("/api/v1/blocks", (req, res) => {
	const { data } = req.body;

	try {
		const block = blockchain.addBlock(data);

		res.status(201).json({ message: "Block tillagt!", block: block });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
