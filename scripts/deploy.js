const hre = require('hardhat')

const main = async() => {
  const [deployer] = await hre.ethers.getSigners()

  console.log(
    "Deploying contracts with the account: ",
    deployer.address
  );

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy()

  await token.deployed()

  console.log("Token deployed to: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1)
  })