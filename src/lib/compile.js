const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const interfacesPath = path.resolve(__dirname, "interfaces");
const todoPath = path.resolve(__dirname, "contracts", "ToDo.sol");

// delete interfaces folder if it exists
fs.removeSync(interfacesPath);

const sourceCode = fs.readFileSync(todoPath, "utf8");
const contracts = solc.compile(sourceCode, 1).contracts;

// create interfaces folder if not there
fs.ensureDirSync(interfacesPath);

for (let contract in contracts) {
  fs.outputJsonSync(
    path.resolve(interfacesPath, contract.replace(":", "") + ".json"),
    contracts[contract]
  );
}
