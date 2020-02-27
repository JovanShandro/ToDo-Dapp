import getWeb3 from "../../lib/getWeb3";
import { getManager, deployManager } from "../../lib/manager";
import compiledTodoList from "../../lib/interfaces/TodoList.json";
import Web3 from "web3";
import { LocalStorage } from "quasar";

let counter = 0;

export async function setWeb3({ commit, dispatch }) {
  let result;
  try {
    result = await getWeb3();
  } catch (err) {
    console.log(err.message);
    return;
  }

  commit("setWeb3Instance", result);
  try {
    dispatch("checkForUpdates");
  } catch (err) {
    console.log(err.message);
    return;
  }
}

export async function loadItems({ state, commit }) {
  const length = await state
    .contract()
    .methods.getNumberOfTasks()
    .call({ from: state.stats.activeAccount });
  const tasks = [];
  for (let i = 0; i < length; i++) {
    const task = await state
      .contract()
      .methods.getTask(i)
      .call({ from: state.stats.activeAccount });
    tasks.push(task);
  }
  commit("setTasks", tasks);
}

export async function deleteTask({ state, commit, dispatch }, id) {
  commit("setIsWriting", true);
  try {
    await state
      .contract()
      .methods.remove(id)
      .send({
        from: state.stats.activeAccount
      });
  } catch (err) {
    console.log(err.message);
  }
  dispatch("loadItems");
  commit("setIsWriting", false);
}

export async function addTask({ state, commit, dispatch }, text) {
  commit("setIsWriting", true);
  try {
    await state
      .contract()
      .methods.add(text)
      .send({ from: state.stats.activeAccount });
  } catch (err) {
    console.log(err.message);
  }
  dispatch("loadItems");
  commit("setIsWriting", false);
}

export async function updateStatus({ state, commit, dispatch }, id) {
  const newStatus = !state.tasks[id].completed;
  commit("setIsWriting", true);
  try {
    await state
      .contract()
      .methods.setStatus(id, newStatus)
      .send({
        from: state.stats.activeAccount
      });
  } catch (err) {
    console.log(err.message);
  }
  dispatch("loadItems");
  commit("setIsWriting", false);
}
export async function getContractInstance({ state, commit, dispatch }) {
  counter = 1;
  let manager,
    web3 = state.stats.web3();
  // check if manager address stored in local storage
  const hasManager = LocalStorage.has(state.stats.netId);
  // if yes get the contract
  if (hasManager) {
    const address = LocalStorage.getItem(state.stats.netId);
    manager = getManager(web3)(address);
  } else {
    // if not create one and store it in local storage
    commit("setIsWriting", true);
    let address;
    try {
      address = await deployManager(web3)(state.stats.activeAccount);
      LocalStorage.set(state.stats.netId, address);
      manager = getManager(web3)(address);
    } catch (err) {
      console.log(err.message);
      return;
    } finally {
      commit("setIsWriting", false);
    }
  }
  //check if there is a todo list instance
  let todoListAddr = await manager.methods
    .getList()
    .call({ from: state.stats.activeAccount });

  // create a list if needed
  if (todoListAddr == "0x0000000000000000000000000000000000000000") {
    commit("setIsWriting", true);
    await manager.methods.createList().send({
      from: state.stats.activeAccount
    });
    commit("setIsWriting", false);

    todoListAddr = await manager.methods
      .getList()
      .call({ from: state.stats.activeAccount });
  }
  if (state.listAddress !== todoListAddr) {
    const web3 = state.stats.web3();
    const contract = new web3.eth.Contract(
      JSON.parse(compiledTodoList.interface),
      todoListAddr
    );

    commit("setContract", () => contract);
    commit("setListAddress", todoListAddr);
    dispatch("loadItems");
  }
}

export function checkForUpdates({ dispatch, commit, state }) {
  web3 = new Web3(window.web3.currentProvider);

  setInterval(async () => {
    if (web3 && state.stats.web3) {
      const activeAccount = await web3.eth.getCoinbase();
      const netId = await web3.eth.net.getId();
      let newAccount,
        newBalance,
        newNetId,
        newFlag,
        changed = false;

      if (netId !== state.stats.netId) {
        newNetId = netId;
        changed = true;
      }

      if (activeAccount !== state.stats.activeAccount) {
        // account has changed
        newAccount = activeAccount;
        newBalance = await web3.eth.getBalance(newAccount);
        // clear tasks of previous account
        commit("clearTasks");
        changed = true;
        newFlag = true;
        counter = 0;
      } else {
        // check for balance changes
        newBalance = await web3.eth.getBalance(state.stats.activeAccount);
        if (newBalance !== state.stats.balance) {
          changed = true;
        }
      }
      if (changed) {
        dispatch("updateWeb3", {
          activeAccount: newAccount,
          balance: newBalance,
          flag: newFlag,
          netId: newNetId
        });
      }
    }
    if (counter == 0) dispatch("getContractInstance");
  }, 300);
}

export function updateWeb3({ commit }, payload) {
  commit("updateWeb3", payload);
}
