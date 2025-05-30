// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TodoList {
    event LogAddress(address _address);

    struct Task {
        string title;
        string description;
        bool completed;
        uint256 timestamp;
    }

    Task[] public tasks;
    address public owner;

    constructor() {
        owner = msg.sender;
        emit LogAddress(address(this));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier checkTaskExists(uint index) {
        require(index < tasks.length, "Task does not exist.");
        _;
    }

    function addTask(
        string memory title,
        string memory description
    ) public onlyOwner {
        tasks.push(
            Task({
                title: title,
                description: description,
                completed: false,
                timestamp: block.timestamp
            })
        );
    }

    function toggleCompletion(
        uint index
    ) public onlyOwner checkTaskExists(index) {
        tasks[index].completed = !tasks[index].completed;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getTask(
        uint index
    ) public view checkTaskExists(index) returns (Task memory) {
        return tasks[index];
    }

    function getTaskCount() public view returns (uint) {
        return tasks.length;
    }

    function getCompletedTaskCount() public view returns (uint) {
        uint count = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                count++;
            }
        }
        return count;
    }

    function deleteTask(uint index) public onlyOwner checkTaskExists(index) {
        tasks[index] = tasks[tasks.length - 1];
        tasks.pop();
    }
}
