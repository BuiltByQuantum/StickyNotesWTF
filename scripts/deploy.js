const chalk = require("chalk");
const { ethers, upgrades } = require("hardhat");

const main = async () => {
  let [deployer] = await ethers.getSigners();
  console.log("\n\n 📡 Deploying...\n");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()).toString()
  );

  console.log(` 🛰  Deploying: nft contract, STEP 1`);
  const NFT = await ethers.getContractFactory("StickyNotes");
  let nft = await NFT.deploy();
  console.log(
    " 📄",
    chalk.cyan("nft"),
    "deployed to:",
    chalk.magenta(nft.address)
  );
  // await nft.mint(
  //   "0xdDe9437a1B0717110240880ff24e575FDBB6CbB7",
  //   "<script>console.log('fgewfew')</script>",
  //   "#7F7F7F",
  //   true
  // );
  await new Promise((resolve) => setTimeout(resolve, 60000));
  // Verify implementation on etherscan
  console.log(`Attempting to verify implementation contract with etherscan`);

  try {
    await hre.run("verify:verify", {
      address: nft.address,
    });
  } catch (error) {
    console.log(error);
  }

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
