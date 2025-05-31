const { ethers } = require("ethers");

const contractAddress = '0x6E5d10cb4787f39e55a40713ba12FCEaf2048046';
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const privateKey = "0x7df2d479e97503959f18fbf5ba1736b470277f2891715aa6fd2938b687ee01ae";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(privateKey, provider);
const signer = provider.getSigner();
if (!signer) {
    signer = wallet
}
const contract = new ethers.Contract(contractAddress, contractABI, signer);



async function main() {
    contract.setGreeting('Hello, Ethers!')
        .then((transaction) => {
            console.log('Transaction:', transaction);
            return transaction.wait(); // Wait for the transaction to be mined
        })
        .then((receipt) => {
            console.log('Transaction receipt:', receipt);
        })
        .catch((error) => {
            console.error('Error sending transaction:', error);
        });
}

main().catch(console.error);