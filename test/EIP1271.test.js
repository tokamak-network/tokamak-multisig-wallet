const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet EIP-1271 Implementation", function () {
    let multiSigWallet;
    let owner1, owner2, owner3, nonOwner;
    let testHash;
    
    const MAGIC_VALUE = "0x1626ba7e";
    const INVALID_VALUE = "0x00000000";

    // 서명 생성 헬퍼 함수
    async function createSignature(signer, hash) {
        const signature = await signer.signMessage(ethers.getBytes(hash));
        return signature;
    }

    beforeEach(async function () {
        [owner1, owner2, owner3, nonOwner] = await ethers.getSigners();
        
        const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        multiSigWallet = await MultiSigWallet.deploy([
            owner1.address,
            owner2.address,
            owner3.address
        ]);
        
        // 테스트용 해시 생성 (32바이트)
        testHash = ethers.keccak256(ethers.toUtf8Bytes("test message"));
    });

    describe("isValidSignature", function () {
        it("should return magic value when enough signatures are added via addSignature", async function () {
            // 해시에 대한 서명 생성 (ethers는 자동으로 Ethereum signed message prefix를 추가함)
            const sig1 = await createSignature(owner1, testHash);
            const sig2 = await createSignature(owner2, testHash);
            
            // addSignature는 원본 해시가 아닌 Ethereum signed message hash를 사용
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            
            await multiSigWallet.connect(owner1).addSignature(ethSignedHash, sig1);
            await multiSigWallet.connect(owner2).addSignature(ethSignedHash, sig2);
            
            const result = await multiSigWallet.isValidSignature(ethSignedHash, "0x");
            expect(result).to.equal(MAGIC_VALUE);
        });

        it("should return invalid value when not enough signatures are added", async function () {
            // owner1만 서명 추가 (2개 필요하지만 1개만)
            const sig1 = await createSignature(owner1, testHash);
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            
            await multiSigWallet.connect(owner1).addSignature(ethSignedHash, sig1);
            
            const result = await multiSigWallet.isValidSignature(ethSignedHash, "0x");
            expect(result).to.equal(INVALID_VALUE);
        });

        it("should validate concatenated signatures correctly", async function () {
            // 연결된 서명으로 검증
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const sig1 = await createSignature(owner1, testHash);
            const sig2 = await createSignature(owner2, testHash);
            
            // 주소 순서대로 정렬
            const addr1 = owner1.address.toLowerCase();
            const addr2 = owner2.address.toLowerCase();
            
            let concatenatedSig;
            if (addr1 < addr2) {
                concatenatedSig = sig1 + sig2.slice(2);
            } else {
                concatenatedSig = sig2 + sig1.slice(2);
            }
            
            const result = await multiSigWallet.isValidSignature(ethSignedHash, concatenatedSig);
            expect(result).to.equal(MAGIC_VALUE);
        });

        it("should validate 3concatenated signatures correctly", async function () {
            // 연결된 서명으로 검증
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const sig1 = await createSignature(owner1, testHash);
            const sig2 = await createSignature(owner2, testHash);
            const sig3 = await createSignature(owner3, testHash);
            
            // 주소 순서대로 정렬
            const addr1 = owner1.address.toLowerCase();
            const addr2 = owner2.address.toLowerCase();
            const addr3 = owner3.address.toLowerCase();
            
            let concatenatedSig;
            const addressSigPairs = [
                { addr: addr1, sig: sig1 },
                { addr: addr2, sig: sig2 },
                { addr: addr3, sig: sig3 }
            ];
            
            // 주소 순으로 정렬
            addressSigPairs.sort((a, b) => a.addr.localeCompare(b.addr));
            
            // 첫 번째 시그니처는 그대로, 나머지는 '0x' 제거 후 연결
            concatenatedSig = addressSigPairs[0].sig + 
                              addressSigPairs[1].sig.slice(2) + 
                              addressSigPairs[2].sig.slice(2);
            
            const result = await multiSigWallet.isValidSignature(ethSignedHash, concatenatedSig);
            expect(result).to.equal(MAGIC_VALUE);
        });
    });

    describe("addSignature", function () {
        it("should add signature successfully for valid owner", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const signature = await createSignature(owner1, testHash);
            
            await expect(multiSigWallet.connect(owner1).addSignature(ethSignedHash, signature))
                .to.emit(multiSigWallet, "SignatureAdded")
                .withArgs(ethSignedHash, owner1.address);
            
            expect(await multiSigWallet.signatureCount(ethSignedHash)).to.equal(1);
            expect(await multiSigWallet.hasSignedHash(ethSignedHash, owner1.address)).to.be.true;
        });

        it("should revert when non-owner tries to add signature", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const signature = await createSignature(nonOwner, testHash);
            
            await expect(multiSigWallet.connect(nonOwner).addSignature(ethSignedHash, signature))
                .to.be.revertedWith("Not a valid signer");
        });

        it("should revert when owner tries to sign twice", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const signature = await createSignature(owner1, testHash);
            
            await multiSigWallet.connect(owner1).addSignature(ethSignedHash, signature);
            
            await expect(multiSigWallet.connect(owner1).addSignature(ethSignedHash, signature))
                .to.be.revertedWith("Already signed");
        });

        it("should increment signature count correctly", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const sig1 = await createSignature(owner1, testHash);
            const sig2 = await createSignature(owner2, testHash);
            
            await multiSigWallet.connect(owner1).addSignature(ethSignedHash, sig1);
            expect(await multiSigWallet.signatureCount(ethSignedHash)).to.equal(1);
            
            await multiSigWallet.connect(owner2).addSignature(ethSignedHash, sig2);
            expect(await multiSigWallet.signatureCount(ethSignedHash)).to.equal(2);
        });
    });

    describe("_validateSignatures", function () {
        it("should validate multiple signatures in correct order", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            
            // 주소 순서 확인
            const signers = [owner1, owner2, owner3].sort((a, b) => 
                a.address.toLowerCase() < b.address.toLowerCase() ? -1 : 1
            );
            
            // 정렬된 순서로 서명 생성
            const sig1 = await createSignature(signers[0], testHash);
            const sig2 = await createSignature(signers[1], testHash);
            
            const concatenatedSig = sig1 + sig2.slice(2);
            
            const result = await multiSigWallet.isValidSignature(ethSignedHash, concatenatedSig);
            expect(result).to.equal(MAGIC_VALUE);
        });

        it("should revert with invalid signature length", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const invalidSig = "0x1234"; // 65바이트가 아닌 잘못된 길이
            
            await expect(multiSigWallet.isValidSignature(ethSignedHash, invalidSig))
                .to.be.revertedWith("Invalid signature length");
        });

        it("should revert when signers are not in order", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            
            // 주소 순서 확인 후 의도적으로 잘못된 순서로 배치
            const sig1 = await createSignature(owner1, testHash);
            const sig2 = await createSignature(owner2, testHash);
            
            let concatenatedSig;
            // 큰 주소를 먼저 배치 (잘못된 순서)
            if (owner1.address.toLowerCase() < owner2.address.toLowerCase()) {
                concatenatedSig = sig2 + sig1.slice(2); // 잘못된 순서
            } else {
                concatenatedSig = sig1 + sig2.slice(2); // 잘못된 순서
            }
            
            await expect(multiSigWallet.isValidSignature(ethSignedHash, concatenatedSig))
                .to.be.revertedWith("Signers not in order");
        });

        it("should revert when signature is from non-owner", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            const nonOwnerSig = await createSignature(nonOwner, testHash);
            const ownerSig = await createSignature(owner1, testHash);
            
            // 순서대로 배치하되 non-owner 포함
            let concatenatedSig;
            if (nonOwner.address.toLowerCase() < owner1.address.toLowerCase()) {
                concatenatedSig = nonOwnerSig + ownerSig.slice(2);
            } else {
                concatenatedSig = ownerSig + nonOwnerSig.slice(2);
            }
            
            await expect(multiSigWallet.isValidSignature(ethSignedHash, concatenatedSig))
                .to.be.revertedWith("Not a valid signer");
        });
    });

    describe("Integration tests", function () {
        it("should work with both addSignature and direct validation methods", async function () {
            const ethSignedHash = ethers.hashMessage(ethers.getBytes(testHash));
            
            // 방법 1: addSignature 사용
            const sig1 = await createSignature(owner1, testHash);
            await multiSigWallet.connect(owner1).addSignature(ethSignedHash, sig1);
            
            let result = await multiSigWallet.isValidSignature(ethSignedHash, "0x");
            expect(result).to.equal(INVALID_VALUE); // 아직 1개만 있음
            
            const sig2 = await createSignature(owner2, testHash);
            await multiSigWallet.connect(owner2).addSignature(ethSignedHash, sig2);
            
            result = await multiSigWallet.isValidSignature(ethSignedHash, "0x");
            expect(result).to.equal(MAGIC_VALUE); // 이제 2개
            
            // 방법 2: 다른 해시로 직접 검증
            const testHash2 = ethers.keccak256(ethers.toUtf8Bytes("test message 2"));
            const ethSignedHash2 = ethers.hashMessage(ethers.getBytes(testHash2));
            const signature1 = await createSignature(owner1, testHash2);
            const signature2 = await createSignature(owner2, testHash2);
            
            // 주소 순서대로 정렬
            let concatenatedSig;
            if (owner1.address.toLowerCase() < owner2.address.toLowerCase()) {
                concatenatedSig = signature1 + signature2.slice(2);
            } else {
                concatenatedSig = signature2 + signature1.slice(2);
            }
            
            result = await multiSigWallet.isValidSignature(ethSignedHash2, concatenatedSig);
            expect(result).to.equal(MAGIC_VALUE);
        });
    });
});