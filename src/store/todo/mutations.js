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
  state.tasks = {};
  for (let i = 0; i < tasks.length; i++) {
    Vue.set(state.tasks, tasks[i][2], {
      text: tasks[i][0],
      completed: tasks[i][1]
    });
  }
}

export function setIsWriting(state, value) {
  state.isWriting = value;
}

export function clearTasks(state) {
  state.tasks = {};
}

export function updateWeb3(state, updates) {
  if (!R.isNil(updates.activeAccount)) {
    state.stats.activeAccount = updates.activeAccount;
  }
  if (!R.isNil(updates.balance)) {
    state.stats.balance = updates.balance;
  }
  if (!R.isNil(updates.netId)) {
    state.stats.netId = updates.netId;
  }
  if (updates.flag) {
    state.listAddress = null;
  }
}
