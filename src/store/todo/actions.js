import getWeb3 from "../../lib/getWeb3";
import manager from "../../lib/manager";
import Web3 from "web3";

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

export async function getContractInstance({ state, commit }) {
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
  if (state.contract !== todoListAddr) commit("setContract", todoListAddr);
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
          balance: newBalance
        });
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
    dispatch("getContractInstance");
  }, 300);
}

export function updateWeb3({ commit }, payload) {
  commit("updateWeb3", payload);
}
