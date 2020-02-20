pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract TodoListManager {
    mapping(address => address) userToList;

    function createList() public {
        // create new contract deployed to the blockchain
        if (
            userToList[msg.sender] == 0x0000000000000000000000000000000000000000
        ) {
            address list = new TodoList(msg.sender);
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

    function remove(uint256 id) public restricted {
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
    }

    function getTasks() public view returns (Task[]) {
        return tasks;
    }

    // function getTask(uint i) public view returns(Task) {
    //     return tasks[i];
    // }

    function setStatus(uint256 id, bool status) public {
        uint256 index = 0;
        for (index; index < tasks.length; index++) {
            if (tasks[index].id == id) {
                tasks[index].status = status;
                break;
            }
        }
    }

    modifier restricted() {
        // restrict usage only to owner
        require(msg.sender == owner);
        _;
    }
}
