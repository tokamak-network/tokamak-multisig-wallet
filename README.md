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