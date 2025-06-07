// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TodoList {
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
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier checkTaskExists(uint256 index) {
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
        uint256 index
    ) public onlyOwner checkTaskExists(index) {
        tasks[index].completed = !tasks[index].completed;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getTask(
        uint256 index
    ) public view checkTaskExists(index) returns (Task memory) {
        Task memory task = tasks[index];
        return task;
    }

    function getTaskCount() public view returns (uint256) {
        return tasks.length;
    }

    function getCompletedTaskCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                count++;
            }
        }
        return count;
    }

    function deleteTask(uint256 index) public onlyOwner checkTaskExists(index) {
        tasks[index] = tasks[tasks.length - 1];
        tasks.pop();
    }
}
