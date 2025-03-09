const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const hre = require("hardhat");
const { ethers } = hre;
const { parseEther } = require("ethers");


describe("MultiSigWallet Test", function () {
  let owner1, owner2, owner3, addr1;

  let owners;

  let multiSigWallet;
  let MultiSigWalletContract;
  let MultiSigWalletContractAddr;

  let testToken;
  let testTokenContract;
  let testTokenContractAddr;

  before('create account', async () => {
    [owner1, owner2, owner3, addr1] = await ethers.getSigners();
    // console.log(owner1.address)
    // console.log(parseEther("1000"))

    owners = [owner1.address, owner2.address, owner3.address]
  })
 
  describe("Deployment Contract", function () {
    it("Deploy the MultiSigWallet", async () => {
      multiSigWallet = await ethers.getContractFactory("MultiSigWallet");
      MultiSigWalletContract = await multiSigWallet.deploy(owners);

      await MultiSigWalletContract.waitForDeployment();
      MultiSigWalletContractAddr = await MultiSigWalletContract.getAddress()
    })

    it("Deploy the TestToken", async () => {
      testToken = await ethers.getContractFactory("TestToken");
      testTokenContract = await testToken.deploy(
        parseEther("1000")
      );

      await testTokenContract.waitForDeployment();
      testTokenContractAddr = await testTokenContract.getAddress()
    })
  });

  describe("Test the MultiSigWallet Contract", function () {
    it("send Token & ETH", async () => {
      //send Token
      await testTokenContract.connect(owner1).transfer(
        MultiSigWalletContractAddr,
        parseEther("1000")
      )

      await owner1.sendTransaction({
        to: MultiSigWalletContractAddr,
        value: parseEther("10")
      })
    })

    it("Test ETH transfer", async () => {
      const recipient = addr1.address;
      const ethAmount = parseEther("1");
      
      await MultiSigWalletContract.connect(owner1).submitTransaction(
        recipient,
        ethAmount,
        "0x"
      );

      // await MultiSigWalletContract.connect(owner1).confirmTransaction(0)
      await MultiSigWalletContract.connect(owner2).confirmTransaction(0)
      const beforeBalance = await ethers.provider.getBalance(recipient);

      await MultiSigWalletContract.connect(owner1).executeTransaction(0)
      // const afterBalance = await ethers.provider.getBalance(recipient);

      expect(await ethers.provider.getBalance(recipient)).to.be.equal(beforeBalance+(ethAmount))
    })

    it("Test ERC20 transfer", async () => {
      const tokenAmount = parseEther("100");

      const dataTransfer = testTokenContract.interface.encodeFunctionData(
        "transfer",
        [addr1.address, tokenAmount]
      )

      await MultiSigWalletContract.connect(owner1).submitTransaction(
        testTokenContractAddr,
        0,
        dataTransfer
      );

      await MultiSigWalletContract.connect(owner2).confirmTransaction(1)
      // await MultiSigWalletContract.connect(owner3).confirmTransaction(1)

      await MultiSigWalletContract.connect(owner3).executeTransaction(1)

      expect(await testTokenContract.balanceOf(addr1.address)).to.be.equal(tokenAmount)
    })

    it("ConfirmTransaction cannot be executed for a Transaction that has already been executeTransactioned.", async () => {
      await expect(
        MultiSigWalletContract.connect(owner3).confirmTransaction(
          1
        )
      ).to.be.revertedWith("tx already executed");
    })

    it("executeTransaction cannot be executed for a Transaction that has already been executeTransactioned.", async () => {
      await expect(
        MultiSigWalletContract.connect(owner3).executeTransaction(
          1
        )
      ).to.be.revertedWith("tx already executed");
    })
    
    it("can't changeOwner by Owner", async () => {
      await expect(
        MultiSigWalletContract.connect(owner1).changeOwner(
          0,
          addr1.address
        )
      ).to.be.revertedWith("Only MultiSigContract can execute");
    })

    it("changeOwner transaction", async () => {
      expect(await MultiSigWalletContract.owners(0)).to.be.equal(owner1.address)
      const dataChangeOwner = MultiSigWalletContract.interface.encodeFunctionData(
        "changeOwner",
        [0, addr1.address]
      )

      await MultiSigWalletContract.connect(owner1).submitTransaction(
        MultiSigWalletContractAddr,
        0,
        dataChangeOwner
      );

      await MultiSigWalletContract.connect(owner2).confirmTransaction(2)
      await MultiSigWalletContract.connect(owner3).confirmTransaction(2)

      await MultiSigWalletContract.connect(owner3).executeTransaction(2)

      expect(await MultiSigWalletContract.owners(0)).to.be.equal(addr1.address)
    })

    it("can't submitTransaction by not Owner", async () => {
      const dataChangeOwner = MultiSigWalletContract.interface.encodeFunctionData(
        "changeOwner",
        [0, owner1.address]
      )
      await expect(
        MultiSigWalletContract.connect(owner1).submitTransaction(
          MultiSigWalletContractAddr,
          0,
          dataChangeOwner
        )
      ).to.be.revertedWith("not owner");
    })

    it("can't confirmTransaction by not Owner", async () => {
      await expect(
        MultiSigWalletContract.connect(owner1).confirmTransaction(
          2
        )
      ).to.be.revertedWith("not owner");
    })

    it("can't executeTransaction by not Owner", async () => {
      await expect(
        MultiSigWalletContract.connect(owner1).executeTransaction(
          2
        )
      ).to.be.revertedWith("not owner");
    })

    it("revokeConfirmation Test", async () => {
      const recipient = owner1.address;
      const ethAmount = parseEther("1");
      
      await MultiSigWalletContract.connect(addr1).submitTransaction(
        recipient,
        ethAmount,
        "0x"
      );

      let count = Number(await MultiSigWalletContract.getTransactionCount())
      let beforeInfo = await MultiSigWalletContract.getTransaction(count-1)
      expect(Number(beforeInfo.numConfirmations)).to.be.equal(1)

      await MultiSigWalletContract.connect(addr1).revokeConfirmation(count-1)
      let afterInfo = await MultiSigWalletContract.getTransaction(count-1)
      expect(Number(afterInfo.numConfirmations)).to.be.equal(0)
    })

    it("executeTransaction cannot be executed if the numConfirmationsRequired value is not exceeded.", async () => {
      let count = Number(await MultiSigWalletContract.getTransactionCount())
      await MultiSigWalletContract.connect(owner2).confirmTransaction(count-1)

      await expect(
        MultiSigWalletContract.connect(addr1).executeTransaction(
          count-1
        )
      ).to.be.revertedWith("cannot execute tx");
    })

    it("The same Owner cannot execute a confirmTransaction again for an index on which a confirmTransaction was executed.", async () => {
      let count = Number(await MultiSigWalletContract.getTransactionCount())

      await expect(
        MultiSigWalletContract.connect(owner2).confirmTransaction(
          count-1
        )
      ).to.be.revertedWith("tx already confirmed");
    })
  })


});
