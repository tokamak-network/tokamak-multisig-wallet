const { ethers } = require("hardhat");
const DAOCommittee_V1_ABI = require("../abi/DAOCommittee_V1.json");
const DAOCommittee_Owner_ABI = require("../abi/DAOCommitteeOwner.json");
const DepositManagerV1_1_ABI = require("../abi/DepositManagerV1_1.json");
const SeigManagerV1_2_ABI = require("../abi/SeigManagerV1_2.json");
const SeigManagerV1_3_ABI = require("../abi/SeigManagerV1_3.json");


async function main() {
    //Signer Setting 
    let [deployer] = await ethers.getSigners();

    let DAOCommitteeProxyAddr = ""
    let DepositManagerProxyAddr = ""
    let SeigManagerProxyAddr = ""

    const DAOCommitteeV1 = await ethers.Contract(
      DAOCommitteeProxyAddr,
      DAOCommittee_V1_ABI.abi,
      deployer
    );

    const DAOCommitteeOwner = await ethers.Contract(
      DAOCommitteeProxyAddr,
      DAOCommittee_Owner_ABI.abi,
      deployer
    );



}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });