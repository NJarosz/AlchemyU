import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256}  from 'ethereum-cryptography/keccak';
import { hexToBytes, toHex } from 'ethereum-cryptography/utils';



function Wallet({ address, setAddress, balance, setBalance, prKey, setPrKey, sig, setSig, msg, setMsg, setBit, bit }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrKey(privateKey);
    const publicKey = secp256k1.getPublicKey(privateKey);
    const address = toHex(keccak256(publicKey).slice(-20));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function sign() {
    const hash = keccak256(Uint8Array.from("send funds"));
    setMsg(toHex(hash));
    const privateKey = prKey;
    const signature = secp256k1.sign(hash, privateKey);
    setBit(signature["recovery"]);
    console.log("bit: ", bit);
    setSig(signature.toCompactHex());
    console.log("signature: ", sig);
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a Private Key, for example: 0x1" value={prKey} onChange={onChange}></input>
      </label>

      <button className="button" onClick={sign}>Create Signature</button>

      <div className="address">Address: {address.slice(0,10)}...</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
