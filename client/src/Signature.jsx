import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const pubKey = secp256k1.getPublicKey(prKey);
const hexPubKey = toHex(pubKey).toUpperCase();

const sign = async (prKey, message) => {
    const hash = hashMessage(message);
  
    const [signature, recoveryBit] = await secp.sign(hash, prKey, {
      recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
  };
  
  const signature = {
    sign,
    hexPubKey,
  };
  export default signature;
