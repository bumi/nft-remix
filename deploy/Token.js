module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const promptly = require('promptly');
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  const maxTokens = await promptly.prompt('Token limit:');
  const metadataBaseUri = await promptly.prompt('Metadata base URI:');
  const name = await promptly.prompt('Name:');
  const symbol = await promptly.prompt('Symbol:');

  const result = await deploy('Token', {
    from: deployer,
    gasLimit: 4000000,
    args: [parseInt(maxTokens), metadataBaseUri, name, symbol],
    log: true
  });
  //if (result.newlyDeployed) {
  //  console.log(`contract deployed at ${result.address} using ${result.receipt.gasUsed} gas`);
  //}
};
