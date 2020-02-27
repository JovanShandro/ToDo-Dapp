import Web3 from "web3";
import compiledManager from "./interfaces/TodoListManager.json";

let web3 = new Web3(window.web3.currentProvider);

const getManager = address =>
  new web3.eth.Contract(JSON.parse(compiledManager.interface), address);

const deployManager = async account => {
  const contract = await new web3.eth.Contract(
    JSON.parse(compiledManager.interface)
  )
    .deploy({ data: compiledManager.bytecode })
    .send({ from: account, gas: "1000000" });
  return contract.options.address;
};
export { getManager, deployManager };
