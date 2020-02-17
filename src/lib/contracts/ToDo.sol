pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract TodoListManager {
    mapping(address => address) userToList;

    function createList() public {
        // create new contract deployed to the blockchain
        address list = new TodoList(msg.sender);
        if (
            userToList[msg.sender] == 0x0000000000000000000000000000000000000000
        ) {
            userToList[msg.sender] = list;
        }
    }

    function getList() public view returns (address) {
        return userToList[msg.sender];
    }
}

contract TodoList {
    struct Task {
        string text;
        bool status;
        uint256 id;
    }
    address public owner;
    Task[] private tasks;
    uint256 private ids = 0;

    function TodoList(address sender) public {
        owner = sender;
    }

    function add(string txt) public restricted {
        Task memory newTask = Task({text: txt, status: false, id: ids});
        ids++;
        tasks.push(newTask);
    }

    function remove(uint256 id) public restricted returns (Task[]) {
        uint256 index = 0;
        for (index; index < tasks.length - 1; index++) {
            if (tasks[index].id == id) {
                break;
            }
        }
        if (index >= tasks.length) return;

        for (uint256 i = index; i < tasks.length - 1; i++) {
            tasks[i] = tasks[i + 1];
        }
        delete tasks[tasks.length - 1];
        tasks.length--;
        return tasks;
    }

    function getTasks() public view returns (Task[]) {
        return tasks;
    }

    function getTask(uint256 i) public view returns (Task) {
        return tasks[i];
    }

    modifier restricted() {
        // restrict usage only to owner
        require(msg.sender == owner);
        _;
    }
}
