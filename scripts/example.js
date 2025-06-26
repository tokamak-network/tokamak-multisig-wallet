const hre = require("hardhat");
const { ethers } = hre;
const { parseEther } = require("ethers");

const DAOCommittee_V1_ABI = require("../abi/DAOCommittee_V1.json");
const DAOCommittee_V2_ABI = require("../abi/DAOCommittee_V2.json");
const DAOCommittee_Owner_ABI = require("../abi/DAOCommitteeOwner.json");
const DepositManagerV1_1_ABI = require("../abi/DepositManagerV1_1.json");
const SeigManagerV1_2_ABI = require("../abi/SeigManagerV1_2.json");
const SeigManagerV1_3_ABI = require("../abi/SeigManagerV1_3.json");
const MultiSigWallet_ABI = require("../abi/MultiSigWallet.json");

async function main() {
    let network = "sepolia"

    //Signer Setting 
    let [deployer] = await ethers.getSigners();

    let DAOCommitteeProxyAddr = "0xA2101482b28E3D99ff6ced517bA41EFf4971a386"
    let MultiSigWalletContractAddr = "0x82460E7D90e19cF778a2C09DcA75Fc9f79Da877C"

    let sepoliaMultiSigWalletOwner = [
      "0xf0B595d10a92A5a9BC3fFeA7e79f5d266b6035Ea", 
      "0x757DE9c340c556b56f62eFaE859Da5e08BAAE7A2", 
      "0xc1eba383D94c6021160042491A5dfaF1d82694E6"
    ]

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

    const DAOCommitteeV2 = await ethers.Contract(
      DAOCommitteeProxyAddr,
      DAOCommittee_V2_ABI.abi,
      deployer
    );

    const MultiSigWalletContract = new ethers.Contract(
      MultiSigWalletContractAddr,
      MultiSigWallet_ABI.abi,
      deployer
    )

    //Use Case 1 : MultiSigWallet Contract Call

    //Use Case 1-1 : MultiSigWallet Contract transactions Call [Get the most recent Transaction Index]
    let transactions = (await MultiSigWalletContract.transactions().length)-1

    //Use Case 1-2 : MultiSigWallet Contract confirmTransaction Call
    let confirmTransaction_index = transactions
    await MultiSigWalletContract.connect(deployer).confirmTransaction(confirmTransaction_index)

    //Use Case 1-3 : MultiSigWallet Contract executeTransaction Call
    await MultiSigWalletContract.connect(deployer).executeTransaction(confirmTransaction_index)  

    //Use Case 1-4 : MultiSigWallet Contract changeOwner Call
    let changeOwner_index = 0 
    let changeOwnerAddress = ""

    const dataChangeOwner = MultiSigWalletContract.interface.encodeFunctionData(
      "changeOwner",
      [changeOwner_index, changeOwnerAddress]
    )
    
    await MultiSigWalletContract.connect(deployer).submitTransaction(
        MultiSigWalletContractAddr,    //address
        0,                             //eth.value
        dataChangeOwner                //functions
    )
    
    //Use Case 2 : DAOCommitteeOwner Contract Call
    
    //Use Case 2-1 : DAOCommitteeOwner setCooldownTime
    const dataSetCooldown = DAOCommitteeOwner.interface.encodeFunctionData(
        "setCooldownTime",
        [259200] // 3 days
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetCooldown
    );

    //Use Case 2-2 : DAOCommitteeOwner setCandidateAddOnFactory
    let candidateAddOnFactoryAddr = "0x..." // Address of candidateAddOnFactory to change

    const dataSetCandidateAddOnFactory = DAOCommitteeOwner.interface.encodeFunctionData(
        "setCandidateAddOnFactory",
        [candidateAddOnFactoryAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetCandidateAddOnFactory
    );

    //Use Case 2-3 : DAOCommitteeOwner setLayer2Manager
    let layer2ManagerAddr = "0x..." // Layer2Manager address to change
    
    const dataSetLayer2Manager = DAOCommitteeOwner.interface.encodeFunctionData(
        "setLayer2Manager",
        [layer2ManagerAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetLayer2Manager
    );

    //Use Case 2-4 : DAOCommitteeOwner setSeigManager
    let seigManagerAddr = "0x..." // SeigManager address to change

    const dataSetSeigManager = DAOCommitteeOwner.interface.encodeFunctionData(
        "setSeigManager",
        [seigManagerAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetSeigManager
    );

    //Use Case 2-5 : DAOCommitteeOwner setDaoVault
    let daoVaultAddr = "0x..." // DaoVault address to change

    const dataSetDaoVault = DAOCommitteeOwner.interface.encodeFunctionData(
        "setDaoVault",
        [daoVaultAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetDaoVault
    );

    //Use Case 2-6 : DAOCommitteeOwner setLayer2Registry
    let layer2RegistryAddr = "0x..." // Layer2Registry address to change

    const dataSetLayer2Registry = DAOCommitteeOwner.interface.encodeFunctionData(
        "setLayer2Registry",
        [layer2RegistryAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetLayer2Registry
    );

    //Use Case 2-7 : DAOCommitteeOwner setAgendaManager
    let agendaManagerAddr = "0x..." // AgendaManager address to change

    const dataSetAgendaManager = DAOCommitteeOwner.interface.encodeFunctionData(
        "setAgendaManager",
        [agendaManagerAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetAgendaManager
    );

    //Use Case 2-8 : DAOCommitteeOwner setCandidateFactory
    let candidateFactoryAddr = "0x..." // CandidateFactory address to change

    const dataSetCandidateFactory = DAOCommitteeOwner.interface.encodeFunctionData(
        "setCandidateFactory",
        [candidateFactoryAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetCandidateFactory
    );

    //Use Case 2-9 : DAOCommitteeOwner setTon
    let tonAddr = "0x..." // TON address to change

    const dataSetTon = DAOCommitteeOwner.interface.encodeFunctionData(
        "setTon",
        [tonAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetTon
    );

    //Use Case 2-10 : DAOCommitteeOwner setWton
    let wtonAddr = "0x..." // WTON address to change

    const dataSetWton = DAOCommitteeOwner.interface.encodeFunctionData(
        "setWton",
        [wtonAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetWton
    );

    //Use Case 2-11 : DAOCommitteeOwner setActivityRewardPerSecond
    const dataSetActivityRewardPerSecond = DAOCommitteeOwner.interface.encodeFunctionData(
        "setActivityRewardPerSecond",
        [31709791983764] // Setting the DAO Member Reward Amount per Second
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetActivityRewardPerSecond
    );

    //Use Case 2-12 : DAOCommitteeOwner setBurntAmountAtDAO
    const dataSetBurntAmountAtDAO = DAOCommitteeOwner.interface.encodeFunctionData(
        "setBurntAmountAtDAO",
        [ethers.utils.parseEther("1000")] // Set the amount of tokens to burn in the SeigManager
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetBurntAmountAtDAO
    );

    //Use Case 2-13 : DAOCommitteeOwner setCandidatesCommittee
    let candidate1Addr = "0x..." // CandidateContract address to change Committee
    let candidate2Addr = "0x..." // CandidateContract address to change Committee
    let candidate3Addr = "0x..." // CandidateContract address to change Committee

    let committeeAddr = "0x..." // New DAOCommitteeProxy contract address
    let candidateContracts = [candidate1Addr, candidate2Addr, candidate3Addr];

    const dataSetCandidatesCommittee = DAOCommitteeOwner.interface.encodeFunctionData(
        "setCandidatesCommittee",
        [candidateContracts, committeeAddr]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetCandidatesCommittee
    );

    //Use Case 2-14 : DAOCommitteeOwner setCandidatesSeigManager
    candidate1Addr = "0x..." // CandidateContract address to change SeigManager
    candidate2Addr = "0x..." // CandidateContract address to change SeigManager
    candidate3Addr = "0x..." // CandidateContract address to change SeigManager

    let seigManagerAddr2 = "0x..." // New SeigManager Address
    candidateContracts = [candidate1Addr, candidate2Addr, candidate3Addr];

    const dataSetCandidatesSeigManager = DAOCommitteeOwner.interface.encodeFunctionData(
        "setCandidatesSeigManager",
        [candidateContracts, seigManagerAddr2]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetCandidatesSeigManager
    );

    //Use Case 2-15 : DAOCommitteeOwner setQuorum
    const dataSetQuorum = DAOCommitteeOwner.interface.encodeFunctionData(
        "setQuorum",
        [1] // Set quorum (e.g. 1 person)
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataSetQuorum
    );

    //Use Case 2-16 : DAOCommitteeOwner increaseMaxMember
    const dataIncreaseMaxMember = DAOCommitteeOwner.interface.encodeFunctionData(
        "increaseMaxMember",
        [5, 3] // New maximum number of members, quorum
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataIncreaseMaxMember
    );

    //Use Case 2-17 : DAOCommitteeOwner decreaseMaxMember
    const dataDecreaseMaxMember = DAOCommitteeOwner.interface.encodeFunctionData(
        "decreaseMaxMember",
        [2, 1] // Reduce member index, new quorum
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,
        0,
        dataDecreaseMaxMember
    );

    //Use Case 2-18 : DAOCommitteeOwner daoExecuteTransaction
    //As an example, let's show how to call the removeFromBlacklist function of DAOCommittee_V2.
    let removeAddress = "0x..." // Address to remove from blacklist

    const data = DAOCommitteeV2.interface.encodeFunctionData(
        "removeFromBlacklist",
        [removeAddress]
    )

    const dataDaoExecuteTransaction = DAOCommitteeOwner.interface.encodeFunctionData(
        "daoExecuteTransaction",
        [DAOCommitteeProxyAddr, data] // [Address containing the function to be executed in data, set of functions to be executed]
    )

    await MultiSigWalletContract.connect(deployer).submitTransaction(
        DAOCommitteeProxyAddr,  // Address to execute daoExecuteTransaction (fixed value: DAOProxy)
        0,
        dataDaoExecuteTransaction
    );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });