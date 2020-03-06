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
  Vue.set(state, "listAddress", address);
}
export function setContract(state, contract) {
  Vue.set(state, "contract", contract);
}
export function setTasks(state, tasks) {
  Vue.set(state, "tasks", {});
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
  Vue.set(state, "tasks", {});
}

export function updateWeb3(state, updates) {
  if (!R.isNil(updates.activeAccount)) {
    Vue.set(state.stats, "activeAccount", updates.activeAccount);
  }
  if (!R.isNil(updates.balance)) {
    Vue.set(state.stats, "balance", updates.balance);
  }
  if (!R.isNil(updates.netId)) {
    Vue.set(state.stats, "netId", updates.netId);
  }
  if (updates.flag) {
    Vue.set(state, "listAddress", null);
  }
}
