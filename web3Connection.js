require('dotenv').config();
const { Web3 } = require('web3');

function getWeb3() {
    try {
        const ganacheHost = process.env.GANACHE_HOST;
        const ganachePort = process.env.GANACHE_PORT;

        if (!ganacheHost || !ganachePort) {
            throw new Error('GANACHE_HOST or GANACHE_PORT not set in .env file');
        }

        const providerUrl = `http://${ganacheHost}:${ganachePort}`;
        const web3 = new Web3(providerUrl);

        return web3;
    } catch (error) {
        console.error('Failed to initialize Web3:', error.message);
        throw error;
    }
}

module.exports = { getWeb3 };