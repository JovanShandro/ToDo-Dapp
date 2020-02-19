import getWeb3 from "../../lib/getWeb3";

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

export function checkForUpdates({ dispatch, state }) {
  web3 = new Web3(window.web3.currentProvider);

  setInterval(() => {
    if (web3 && state.stats.web3) {
      if (web3.eth.coinbase !== state.stats.activeAccount) {
        // account has changed
        let newAccount = web3.eth.coinbase;
        web3.eth.getBalance(newAccount, (err, newBalance) => {
          if (err) {
            console.log(err.message);
          } else {
            dispatch("updateWeb3", {
              activeAccount: newAccount,
              balance: newBalance
            });
          }
        });
      } else {
        // check for balance changes
        web3.eth.getBalance(state.stats.activeAccount, (err, newBalance) => {
          if (err) {
            console.log(err.message);
          } else if (newBalance !== state.stats.balance) {
            dispatch("updateWeb3", {
              activeAccount: state.stats.activeAccount,
              balance: newBalance
            });
          }
        });
      }
    }
  }, 300);
}

export function updateWeb3({ commit }, payload) {
  commit("updateWeb3", payload);
}
