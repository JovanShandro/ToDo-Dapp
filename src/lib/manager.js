import Web3 from "web3";
import compiledManager from "./interfaces/TodoListManager.json";

let web3 = new Web3(window.web3.currentProvider);

const manager = new web3.eth.Contract(
  JSON.parse(compiledManager.interface),
  "0x277c773f04d6a39068f7b7cabd89127802a01ba7"
);

export default manager;
