import Web3 from "web3";

const getWeb3 = async () => {
  // Check for injected web3 from Metamask
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      throw new Error("Need account access to proceed!");
    }
  } else if (typeof window.web3 !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    throw new Error("Failed to connect to Metamask!!!");
  }

  // Check if you are logged in on metamask
  let netId, activeAccount, balance, metamask;
  try {
    metamask = await web3.eth.net.isListening();
  } catch (error) {
    throw new Error("Failed to check if you are logged in on Metamask!");
  }

  // Get the id of the network
  try {
    netId = await web3.eth.net.getId();
  } catch (error) {
    throw new Error("Failed to get id of the network");
  }

  // Get the current active address
  try {
    activeAccount = await web3.eth.getCoinbase();
  } catch (error) {
    throw new Error("Failed to get the active account!");
  }

  // Get balance for the active account
  try {
    balance = await web3.eth.getBalance(activeAccount);
  } catch (error) {
    throw new Error("Failed to get balance of account " + activeAccount);
  }

  return {
    netId,
    activeAccount,
    balance,
    metamask,
    web3() {
      return web3;
    }
  };
};

export default getWeb3;
