require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-ganache");
require('hardhat-deploy');
require("hardhat-deploy-ethers");

const promptly = require('promptly');


task('fund', "Send eth to an address", async () => {
  const to = await promptly.prompt('Address:');
  const value = await promptly.prompt('Value:');

  const signer = await ethers.getSigners();

  const fundTransaction = await signer[0].sendTransaction({to: to, value: ethers.utils.parseEther(value)});
  console.log(fundTransaction);
});

task("create-wallet", "Creates a new wallet json", async () => {
  const wallet = ethers.Wallet.createRandom();

  console.log('New wallet:');
  console.log(`Address: ${wallet.address}`);
  console.log(`Public key: ${wallet.publicKey}`);
  console.log(`Private key: ${wallet.privateKey}`);
  console.log(`Mnemonic: ${JSON.stringify(wallet.mnemonic)}`);

  const password = await promptly.prompt('Encryption password: ')
  const encryptedJSON = await wallet.encrypt(password);

  console.log('Encrypted wallet JSON:');
  console.log(encryptedJSON);
});

task("mint", "Mint a new token", async () => {
  const Token = await hre.ethers.getContract("Token");
  const name = await Token.name();
  console.log(`Minting token on ${name}`);
  const code = await promptly.prompt('Code:');
  const hash = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes(code));
  const tx = await Token.mint(hash);
  console.log(tx);
});

module.exports = {
  solidity: "0.8.0",
  // defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ -- YOUR INFURA TOKEN",
      accounts: ['YOUR PRIVATE KEY']
    },
    mainnet: {
      url: "https://infura.io/v3/ -- YOUR INFURA TOKEN",
      accounts: ['YOUR PRIVATE KEY']
    }

  },
  namedAccounts: {
    deployer: {
      default: 0,
      4: 'ADDRESS OF YOUR PRIVATE KEY',
      1: 'ADDRESS OF YOUR PRIVATE KEY',
    }
  }
};
