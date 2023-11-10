const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require('ethereum-cryptography/secp256k1.js');
const { keccak256}  = require('ethereum-cryptography/keccak');
const { toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  "04e5ec3498b0b678a9ed5d613da577b4d8bd149f": 100,
  "d71cfcb828eaba1814b183e8d4ad82d1da4ce44e": 50,
  "75c861a1558db939408aad10004b015a2a8f3c71": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side app
  // recover the public address

  const { signature, recipient, amount, message, recoveryBit } = req.body;

  const sig = secp256k1.Signature.fromCompact(signature).addRecoveryBit(recoveryBit);
  const pubKey = sig.recoverPublicKey(message).toRawBytes();
  const sender = toHex(keccak256(pubKey).slice(-20));

  setInitialBalance(sender);
  setInitialBalance(recipient);


  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough Funds" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
