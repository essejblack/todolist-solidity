const TodoListContract = artifacts.require("TodoList");

module.exports = function (deployer) {
  deployer.deploy(TodoListContract);
};