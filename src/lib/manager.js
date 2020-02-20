import Web3 from "web3";
import compiledManager from "./interfaces/TodoListManager.json";

let web3 = new Web3(window.web3.currentProvider);

const instance = new web3.eth.Contract(
  JSON.parse(compiledManager.interface),
  "0xdf011c6afc5ed28d0d3017c8e01ce7437ed8aa14"
);

export default instance;
