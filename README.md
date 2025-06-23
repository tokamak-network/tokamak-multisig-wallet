# tokamak-multisig-wallet

## How to Install

### install the npm
```
npm install
```

### Setting the .env
```
cp .env.sample .env

Please enter your key in the .env file
```


## DAO function Call example 


### 1. MultiSigWallet changeOwner
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const dataChangeOwner = MultiSigWalletContract.interface.encodeFunctionData(
    "changeOwner",
    [changeOwner_index, changeOwnerAddress]
)


await MultiSigWalletContract.connect(owner).submitTransaction(
    MultiSigWalletContractAddr,    //address
    0,                             //eth.value
    dataChangeOwner                //functions
)

```

### 2. MultiSigWallet Send ETH
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const recipient = user1.address;
const ethAmount = ethers.utils.parseEther("0.5");

await MultiSigWalletContract.connect(owner).submitTransaction(
    recipient,
    ethAmount,
    "0x"
);
```


### 3. MultiSigWallet Send ERC20
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const tokenAmount = ethers.utils.parseEther("100");
const dataTransfer = erc20Token.interface.encodeFunctionData(
  "transfer",
  [user1.address, tokenAmount]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
  erc20Token.address,
  0,
  dataTransfer
);
```


### 4. DAOCommitteeOwner setCooldownTime
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetCooldown = DAOCommitteeOwner.interface.encodeFunctionData(
    "setCooldownTime",
    [259200]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetCooldown
);

```

### 5. DAOCommitteeOwner setCandidateAddOnFactory
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetCandidateAddOnFactory = DAOCommitteeOwner.interface.encodeFunctionData(
    "setCandidateAddOnFactory",
    [candidateAddOnFactoryAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetCandidateAddOnFactory
);

```

### 6. DAOCommitteeOwner setLayer2Manager
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetLayer2Manager = DAOCommitteeOwner.interface.encodeFunctionData(
    "setLayer2Manager",
    [layer2ManagerAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetLayer2Manager
);

```

### 7. DAOCommitteeOwner setSeigManager
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetSeigManager = DAOCommitteeOwner.interface.encodeFunctionData(
    "setSeigManager",
    [seigManagerAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetSeigManager
);

```

### 8. DAOCommitteeOwner setDaoVault
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetDaoVault = DAOCommitteeOwner.interface.encodeFunctionData(
    "setDaoVault",
    [daoVaultAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetDaoVault
);

```


### 9. DAOCommitteeOwner setLayer2Registry
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetLayer2Registry = DAOCommitteeOwner.interface.encodeFunctionData(
    "setLayer2Registry",
    [layer2RegistryAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetLayer2Registry
);

```

### 10. DAOCommitteeOwner setAgendaManager
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetAgendaManager = DAOCommitteeOwner.interface.encodeFunctionData(
    "setAgendaManager",
    [agendaManagerAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetAgendaManager
);

```


### 11. DAOCommitteeOwner setCandidateFactory
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetCandidateFactory = DAOCommitteeOwner.interface.encodeFunctionData(
    "setCandidateFactory",
    [candidateFactoryAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetCandidateFactory
);

```

### 12. DAOCommitteeOwner setTon
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetTon = DAOCommitteeOwner.interface.encodeFunctionData(
    "setTon",
    [tonAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetTon
);

```


### 13. DAOCommitteeOwner setWton
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetWton = DAOCommitteeOwner.interface.encodeFunctionData(
    "setWton",
    [wtonAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetWton
);

```

### 14. DAOCommitteeOwner setActivityRewardPerSecond
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetActivityRewardPerSecond = DAOCommitteeOwner.interface.encodeFunctionData(
    "setActivityRewardPerSecond",
    [31709791983764] // Setting the DAO Member Reward Amount per Second
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetActivityRewardPerSecond
);

```

### 15. DAOCommitteeOwner setBurntAmountAtDAO
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetBurntAmountAtDAO = DAOCommitteeOwner.interface.encodeFunctionData(
    "setBurntAmountAtDAO",
    [ethers.utils.parseEther("1000")] // Set the amount of tokens to burn in the SeigManager
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetBurntAmountAtDAO
);

```

### 16. DAOCommitteeOwner setCandidatesCommittee
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const candidateContracts = [candidate1Addr, candidate2Addr, candidate3Addr];
const committeeAddr = "0x..."; //  New DAOCommitteeProxy contract address

const dataSetCandidatesCommittee = DAOCommitteeOwner.interface.encodeFunctionData(
    "setCandidatesCommittee",
    [candidateContracts, committeeAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetCandidatesCommittee
);

```

### 17. DAOCommitteeOwner setCandidatesSeigManager
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const candidateContracts = [candidate1Addr, candidate2Addr, candidate3Addr];
const seigManagerAddr = "0x..."; // New SeigManager Address

const dataSetCandidatesSeigManager = DAOCommitteeOwner.interface.encodeFunctionData(
    "setCandidatesSeigManager",
    [candidateContracts, seigManagerAddr]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetCandidatesSeigManager
);

```

### 18. DAOCommitteeOwner setQuorum
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataSetQuorum = DAOCommitteeOwner.interface.encodeFunctionData(
    "setQuorum",
    [1] // Set quorum (e.g. 1 person)
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataSetQuorum
);

```

### 19. DAOCommitteeOwner increaseMaxMember
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataIncreaseMaxMember = DAOCommitteeOwner.interface.encodeFunctionData(
    "increaseMaxMember",
    [5, 3] // New maximum number of members, quorum
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataIncreaseMaxMember
);

```

### 20. DAOCommitteeOwner decreaseMaxMember
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const dataDecreaseMaxMember = DAOCommitteeOwner.interface.encodeFunctionData(
    "decreaseMaxMember",
    [2, 1] // Reduce member index, new quorum
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataDecreaseMaxMember
);

```

### 21. DAOCommitteeOwner daoExecuteTransaction
```
const MultiSigWalletContract = new ethers.Contract(
    MultiSigWalletContractAddr,
    MultiSigWallet_ABI.abi,
    provider
)

const DAOCommitteeOwner = await ethers.Contract(
  DAOCommitteeProxyAddr,
  DAOCommittee_Owner_ABI.abi,
  provider
);

const targetAddress = "0x..."; // Contract address to execute
const executeData = "0x..."; // Function data to be executed

const dataDaoExecuteTransaction = DAOCommitteeOwner.interface.encodeFunctionData(
    "daoExecuteTransaction",
    [targetAddress, executeData]
)

await MultiSigWalletContract.connect(owner).submitTransaction(
    DAOCommitteeProxyAddr,
    0,
    dataDaoExecuteTransaction
);

```