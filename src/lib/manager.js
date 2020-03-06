import compiledManager from "./interfaces/TodoListManager.json";

const getManager = web3 => address =>
  new web3.eth.Contract(JSON.parse(compiledManager.interface), address);

export default getManager;
