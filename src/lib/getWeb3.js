import Web3 from "web3";

export default getWeb3 = () =>
  new Promise((res, rej) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          res(web3);
        } catch (err) {
          rej(err);
        }
      } else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        res(web3);
      }
      // Fallback to localhost
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        // Use local web3 instance
        const web3 = new Web3(provider);
        res(web3);
      }
    });
  });
