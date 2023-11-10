import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256}  from 'ethereum-cryptography/keccak';
import { hexToBytes, toHex } from 'ethereum-cryptography/utils';

function Transfer({ address, setBalance, sig, msg, bit }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  
  console.log("msg: ", msg, "sig: ", sig, "bit: ", bit);

  async function transfer(evt) {
    evt.preventDefault();
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: sig,
        amount: parseInt(sendAmount),
        message: msg,
        recoveryBit: bit,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
