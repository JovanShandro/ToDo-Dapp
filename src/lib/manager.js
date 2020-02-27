import compiledManager from "./interfaces/TodoListManager.json";

const getManager = web3 => address =>
  new web3.eth.Contract(JSON.parse(compiledManager.interface), address);

const deployManager = web3 => async account => {
  const contract = await new web3.eth.Contract(
    JSON.parse(compiledManager.interface)
  )
    .deploy({ data: compiledManager.bytecode })
    .send({ from: account, gas: "1000000" });
  return contract.options.address;
};
export { getManager, deployManager };
