const { secp256k1 } = require('ethereum-cryptography/secp256k1.js');
const { hexToBytes, toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

// const prKey = hexToBytes("14f85206d50b1531f9ade23b9e66b9d3c0bdd246046247dc265f5adbb5b4e49d");

// console.log('private Key: ', toHex(prKey));

// const pubKey = secp256k1.getPublicKey(prKey);

// console.log('public key: ', toHex(pubKey));

// const addr = keccak256(pubKey).slice(-20);

// console.log("address: ", toHex(addr));

const prKey = "14f85206d50b1531f9ade23b9e66b9d3c0bdd246046247dc265f5adbb5b4e49d";

const hash = keccak256(Uint8Array.from("send funds"));

const signature = secp256k1.sign(hash, prKey);

const bit = signature["recovery"];
console.log(bit);

const sig = signature.toCompactHex();

console.log("Signature: ", signature);

const recover = secp256k1.Signature.fromCompact(sig).addRecoveryBit(bit);
console.log("recover: ", recover);

const pubKey = recover.recoverPublicKey(hash).toRawBytes();

console.log(toHex(pubKey));
