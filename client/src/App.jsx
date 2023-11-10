import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [prKey, setPrKey] = useState("");
  const [sig, setSig] = useState("");
  const [msg, setMsg] = useState("");
  const [bit, setBit] = useState(0);


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        prKey={prKey}
        setPrKey={setPrKey}
        address={address}
        setAddress={setAddress}
        setSig={setSig}
        setMsg={setMsg}
        setBit={setBit}
        bit={bit}
        sig={sig}
      />
      <Transfer setBalance={setBalance} address={address} sig={sig} msg={msg} bit={bit} />
    </div>
  );
}

export default App;
