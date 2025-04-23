const { ethers } = require("hardhat");

async function main() {
    //mainnet
    // let owner1 = "0x77b9D55e98126CD457D8F914647e634613D2A7fc"
    // let owner2 = "0x9de8cAc67B6514837c31F367aC18a457d8f34c3D"
    // let owner3 = "0xa4ABB4Bb512Fc1fecF5556ADDa9B8a4C96dc3790"

    //sepolia
    let owner1 = "0xf0B595d10a92A5a9BC3fFeA7e79f5d266b6035Ea"
    let owner2 = "0x757DE9c340c556b56f62eFaE859Da5e08BAAE7A2"
    let owner3 = "0xc1eba383D94c6021160042491A5dfaF1d82694E6"

    // '0xf0B595d10a92A5a9BC3fFeA7e79f5d266b6035Ea',
    // '0x757DE9c340c556b56f62eFaE859Da5e08BAAE7A2',
    // '0xc1eba383D94c6021160042491A5dfaF1d82694E6'

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

    const owners = [owner1, owner2, owner3];

    const multiSigWallet = await MultiSigWallet.deploy(owners)

    await multiSigWallet.waitForDeployment();

    const deployedAddress = await multiSigWallet.getAddress()
    console.log("MultiSigWallet deployed at:", deployedAddress)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });