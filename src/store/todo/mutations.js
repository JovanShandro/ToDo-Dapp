import * as R from "ramda";

export function setWeb3Instance(state, payload) {
  state.stats = R.merge(state.stats, {
    activeAccount: payload.activeAccount,
    netId: payload.netId,
    balance: payload.balance,
    metamask: payload.metamask,
    web3: payload.web3
  });
}

export function updateWeb3(state, updates) {
  state.stats.activeAccount = updates.activeAccount;
  state.stats.balance = updates.balance;
}
