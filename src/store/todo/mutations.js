import * as R from "ramda";
import Vue from "vue";

export function setWeb3Instance(state, payload) {
  state.stats = R.merge(state.stats, {
    activeAccount: payload.activeAccount,
    netId: payload.netId,
    balance: payload.balance,
    metamask: payload.metamask,
    web3: payload.web3
  });
}

export function setListAddress(state, address) {
  state.listAddress = address;
}
export function setContract(state, contract) {
  state.contract = contract;
}
export function setTasks(state, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    Vue.set(state.tasks, tasks[i][2], {
      text: tasks[i][0],
      completed: tasks[i][1]
    });
  }
}

export function updateWeb3(state, updates) {
  state.stats.activeAccount = updates.activeAccount;
  state.stats.balance = updates.balance;
  if (updates.flag) {
    state.listAddress = null;
  }
}
