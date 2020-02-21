import getWeb3 from "../../lib/getWeb3";
import manager from "../../lib/manager";
import compiledTodoList from "../../lib/interfaces/TodoList.json";
import Web3 from "web3";

let counter = 0;

export function setWeb3({ commit, dispatch }) {
  getWeb3
    .then(result => {
      commit("setWeb3Instance", result);
      dispatch("checkForUpdates");
    })
    .catch(err => {
      console.log(err.message);
    });
}

export async function loadItems({ state, commit }) {
  const length = await state
    .contract()
    .methods.getNumberOfTasks()
    .call({ from: state.activeAccount });
  const tasks = [];
  for (let i = 0; i < length; i++) {
    const task = await state
      .contract()
      .methods.getTask(i)
      .call({ from: state.activeAccount });
    tasks.push(task);
  }
  commit("setTasks", tasks);
}

export async function deleteTask({ state, dispatch }, id) {
  await state
    .contract()
    .methods.remove(id)
    .send({
      from: state.stats.activeAccount
    });
  dispatch("loadItems");
}
export async function getContractInstance({ state, commit, dispatch }, web3) {
  counter = 1;
  //check if there is a todo list instance
  let todoListAddr = await manager.methods
    .getList()
    .call({ from: state.stats.activeAccount });

  // create a list if needed
  if (todoListAddr == "0x0000000000000000000000000000000000000000") {
    await manager.methods.createList().send({
      from: state.stats.activeAccount
    });
    todoListAddr = await manager.methods
      .getList()
      .call({ from: state.stats.activeAccount });
  }
  if (state.listAddress !== todoListAddr) {
    const contract = new web3.eth.Contract(
      JSON.parse(compiledTodoList.interface),
      todoListAddr
    );

    commit("setContract", () => contract);
    commit("setListAddress", todoListAddr);
    dispatch("loadItems");
  }
}

export function checkForUpdates({ dispatch, state }) {
  web3 = new Web3(window.web3.currentProvider);

  setInterval(async () => {
    if (web3 && state.stats.web3) {
      const coinbase = await web3.eth.getCoinbase();
      if (coinbase !== state.stats.activeAccount) {
        // account has changed
        let newAccount = coinbase;
        const newBalance = await web3.eth.getBalance(newAccount);
        dispatch("updateWeb3", {
          activeAccount: newAccount,
          balance: newBalance,
          flag: 1
        });
        counter = 0;
      } else {
        // check for balance changes
        const newBalance = await web3.eth.getBalance(state.stats.activeAccount);
        if (newBalance !== state.stats.balance) {
          dispatch("updateWeb3", {
            activeAccount: state.stats.activeAccount,
            balance: newBalance
          });
        }
      }
    }
    if (counter == 0) dispatch("getContractInstance", web3);
  }, 300);
}

export function updateWeb3({ commit }, payload) {
  commit("updateWeb3", payload);
}
