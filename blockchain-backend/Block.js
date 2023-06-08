const GENESIS_DATA = require("./config");
const cryptoHash = require("./hash");

class Block {
	constructor({ timestamp, data, hash, lastHash }) {
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash;
		this.lastHash = lastHash;
	}

	static genesisBlock() {
		return new this({
			timestamp: GENESIS_DATA.timestamp,
			data: GENESIS_DATA.data,
			lastHash: GENESIS_DATA.lastHash,
			hash: cryptoHash(
				GENESIS_DATA.data,
				GENESIS_DATA.lastHash,
				GENESIS_DATA.timestamp
			),
		});
	}

	calculateHash() {
		return cryptoHash(this.data, this.lastHash, this.timestamp);
	}

	static mineBlock({ lastBlock, data }) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const hash = cryptoHash(timestamp, lastHash, data);

		return new this({
			timestamp,
			lastHash,
			data,
			hash: hash,
		});
	}
}

module.exports = Block;
