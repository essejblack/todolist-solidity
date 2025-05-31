const { ethers } = require("ethers");

const contractAddress = '0x6E5d10cb4787f39e55a40713ba12FCEaf2048046';
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tasks",
        "outputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "toggleCompletion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTasks",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "completed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TodoList.Task[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getTask",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "completed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TodoList.Task",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getTaskCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getCompletedTaskCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "deleteTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
//const provider = new ethers.providers.Web3Provider(window.ethereum);

const privateKey = "0x7df2d479e97503959f18fbf5ba1736b470277f2891715aa6fd2938b687ee01ae";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(privateKey, provider);
const signer = provider.getSigner();
if (!signer) {
    signer = wallet
}
const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function addTask(title, description) {
    try {
        const tx = await contract.addTask(title, description);
        await tx.wait();
        console.log("Task added, tx hash:", tx.hash);
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

async function getTasks() {
    const tasks = await contract.getTasks();
    return tasks;
}

async function main() {
    await addTask("Test Task", "This is a test task");
    const tasks = await getTasks();
    console.log("Tasks:", tasks);
}

main().catch(console.error);