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