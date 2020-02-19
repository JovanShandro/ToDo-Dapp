import Web3 from "web3";

const getWeb3 = new Promise(function(resolve, reject) {
  // Check for injected web3 from Metamask
  if (typeof window.web3 !== "undefined") {
    var web3 = new Web3(window.web3.currentProvider);
    resolve({
      metamask: web3.isConnected(),
      web3() {
        return web3;
      }
    });
  } else {
    reject(new Error("Failed to connect to Metamask!!!"));
  }
})
  .then(value => {
    return new Promise(function(resolve, reject) {
      // Get the id of the network
      value.web3().version.getNetwork((err, netId) => {
        if (err) {
          reject(new Error("Failed to get id of the network"));
        } else {
          value = Object.assign({}, value, { netId });
          resolve(value);
        }
      });
    });
  })
  .then(value => {
    return new Promise(function(resolve, reject) {
      // Get the current active address
      value.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error("Failed to get the active account!"));
        } else {
          value = Object.assign({}, value, { activeAccount: coinbase });
          resolve(value);
        }
      });
    });
  })
  .then(value => {
    return new Promise(function(resolve, reject) {
      // Get balance for the active account
      value.web3().eth.getBalance(value.activeAccount, (err, balance) => {
        if (err) {
          reject(
            new Error("Failed to get balance of account " + value.activeAccount)
          );
        } else {
          value = Object.assign({}, value, { balance });
          resolve(value);
        }
      });
    });
  });

export default getWeb3;
