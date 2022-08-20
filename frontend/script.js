const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const ethers = window.ethers;
const TARGET_CHAIN_ID = 1;
var selectedColor = "#fff8aa";
var web3;
var toggle = false;
var signer;
var provider;
const ALCHEMY = "nW-baLqO-05umB104pU9aoHIi6GF6Opk"
const readOnlyProvider = ethers.providers.getDefaultProvider(1, {
  alchemy: ALCHEMY,
})
const contractData = {
  addresses: {
    1: "0x41fE1792eE022493FD5475d27c8a79d3836ffa49",
    4: "0x72EAC103C85B32D1Fa3a5418a91654699C582b71",
  },
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "adminBurn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "bank",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getSvg",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          internalType: "string",
          name: "color",
          type: "string",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "bool",
          name: "isSBT",
          type: "bool",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "price",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_bank",
          type: "address",
        },
      ],
      name: "setBank",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "setPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_style",
          type: "string",
        },
      ],
      name: "setStyle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "stickies",
      outputs: [
        {
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          internalType: "string",
          name: "color",
          type: "string",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "bool",
          name: "isSBT",
          type: "bool",
        },
        {
          internalType: "address",
          name: "creator",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "style",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

function init() {
  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {};

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
}

async function fetchAccountData() {
  // Get a Web3 instance for the wallet
  web3 = new ethers.providers.Web3Provider(provider, "any");
  // Get list of accounts of the connected wallet
  signer = await web3.getSigner();
  selectedAccount = signer.getAddress();
}
async function refreshAccountData() {
  await fetchAccountData(provider);
}

/**
 * Connect wallet button pressed.
 */
async function onConnect() {
  try {
    await connectWallet()
    await mint();
  } catch (errorT) {
    error(errorT.message);
  }
}

async function connectWallet() {
  try {
    provider = await web3Modal.connect();
    await refreshAccountData();
    await web3.provider.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: ethers.utils.hexValue(TARGET_CHAIN_ID),
        },
      ],
    });
  } catch (errorT) {
    error(errorT.message);
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
  if (provider.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;
}

async function mint() {
  const contract = new ethers.Contract(
    contractData.addresses[TARGET_CHAIN_ID],
    contractData.abi,
    signer
  );
  let to = document.querySelector("#name").value;
  let field = document.querySelector("#noteText").value;
  let title = document.querySelector("#title").value;
  await contract.mint(to, field, selectedColor, title, toggle, {
    value: ethers.utils.parseEther("0.001"),
  });
}

function changeImage() {
  toggle = !toggle;
  if (toggle === true) {
    document.getElementById("lock").src = "lock.svg";
    document.getElementById("lockText").innerHTML = "SBT";
    document.getElementById("lockText").style.color = "#FF7474";
    document.getElementById("warning").style.display = "block";
    document.getElementById("title").style.display = "none";
    document.getElementById("warning").innerHTML =
      "SBTs cannot be transferred once sent. Sender can burn from contract.";
    setTimeout(() => {
      document.getElementById("warning").style.display = "none";
      document.getElementById("title").style.display = "block";
    }, 6500);
  } else {
    document.getElementById("title").style.display = "block";
    document.getElementById("lock").src = "unlock.svg";
    document.getElementById("lockText").style.color = "black";
    document.getElementById("lockText").innerHTML = "NFT";
    document.getElementById("warning").innerHTML = "";
  }
}

function error(text) {
  document.getElementById("error").style.display = "block";
  document.getElementById("error").innerHTML = text;
}

async function getSVG(tokenId) {
  try {
    const contract = new ethers.Contract(
      contractData.addresses[TARGET_CHAIN_ID],
      contractData.abi,
      readOnlyProvider
    );
    const metadata_base64 = await contract.tokenURI(Number(tokenId))
    if (!metadata_base64) {
      throw new Error("no metadata found")
    }
    let metadata_str = atob(metadata_base64.replace(/^data:application\/(json);base64,/, ''));
    const metadata = JSON.parse(metadata_str)
    // console.log("metadata", metadata)
    // const animation_url = metadata.animation_url.replace(/^data:image\/(svg\+xml);/, '')
    const animation_url = metadata.animation_url
    console.log("animation url", animation_url)
    return animation_url
  } catch (error) {
    console.log(error)
    error(error)
  }
}

async function getSticky(tokenId) {
  try {
    const contract = new ethers.Contract(
      contractData.addresses[TARGET_CHAIN_ID],
      contractData.abi,
      readOnlyProvider
    );
    const sticky_data = await contract.stickies(Number(tokenId))
    return sticky_data
  } catch (error) {
    error(error)
    return null
  }
}
async function getOwner(tokenId) {
  try {
    const contract = new ethers.Contract(
      contractData.addresses[TARGET_CHAIN_ID],
      contractData.abi,
      readOnlyProvider
    );
    const owner_address = await contract.ownerOf(Number(tokenId))
    return owner_address
  } catch (error) {
    console.log(error)
    error(error)
    return null
  }
}

async function getSender(tokenId) {
  const sticky_data = await this.getSticky(tokenId)
  console.log("creator", sticky_data?.creator)
  return sticky_data?.creator
}

function previewSVG(color = selectedColor, isSBT = toggle) {

  try {
    let text = document.querySelector("#noteText").value;
    text = text.replace(/\n/g, '<br>')

    let filteredText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, 'ð')
   let testEncoder = new TextEncoder()
    let encode = testEncoder.encode(filteredText)


    let testDecode = new TextDecoder('utf8')

    let encoded = btoa(testDecode.decode(encode));


    let SBT = "NFT";
    let lock =
      "'/></g><rect id='noteTop' width='563' height='48' transform='translate(37 35)' fill='#fff' opacity='0.263'/><g id='modeToggle'><text id='label' transform='translate(575 73)' font-size='6'><tspan x='0' y='0'>NFT</tspan></text><g id='icon' transform='translate(574.587 48.134)'><g id='Mask_Group_1' data-name='Mask Group 1' clip-path='url(#clip-path)'><g id='Mask_Group_2' data-name='Mask Group 2' clip-path='url(#clip-path-2)'><path id='Path_1-3' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5c-2.757,0-4.966.735-4.966,3.491H13.61c0-1.612,1.278-1.415,2.89-1.415A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#717171'/></g></g></g></g><rect id='textBG' width='526' height='464' transform='translate(55 111)' fill='#fff' opacity='0.17'/></g><style>";
    if (isSBT) {
      SBT = "SBT";
      lock =
        "'/></g><rect id='noteTop' width='563' height='48' transform='translate(37 35)' fill='#fff' opacity='0.263'/><g id='modeToggle'><text id='label' transform='translate(575 73)' font-size='6' fill='#ff7474'><tspan x='0' y='0'>SBT</tspan></text><g id='icon' transform='translate(574.587 48.134)'><path id='Path_1' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5,5.277,5.277,0,0,0-4.91,5c-.021.022,0,1.485,0,1.9h2.076c0-.073-.054-1.523,0-1.9.059-1.078,1.295-2.923,2.834-2.923A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#ff7474'/></g></g><rect id='textBG' width='526' height='464' transform='translate(55 111)' fill='#fff' opacity='0.17'/></g><style>";
    }
    let decoded = atob(encoded);
    let svgStart =
      "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='636' height='636' viewBox='0 0 636 636'><defs><filter id='noteBG' x='28' y='32' width='581' height='581' filterUnits='userSpaceOnUse'><feOffset dy='3' input='SourceAlpha'/><feGaussianBlur stdDeviation='3' result='blur'/><feFlood flood-opacity='0.161'/><feComposite operator='in' in2='blur'/><feComposite in='SourceGraphic'/></filter><clipPath id='clip-path'><path id='Path_1' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5,5.277,5.277,0,0,0-4.91,5c-.021.022,0,1.485,0,1.9h2.076c0-.073-.054-1.523,0-1.9.059-1.078,1.295-2.923,2.834-2.923A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#ff7474'/></clipPath><clipPath id='clip-path-2'><path id='Path_1-2' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5,5.277,5.277,0,0,0-4.91,5c-.021.022,0,1.485,0,1.9h2.076c0-.073-.054-1.523,0-1.9.059-1.078,1.3-2.923,2.834-2.923A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#ff7474'/></clipPath><clipPath id='clip-NFT'><rect width='636' height='636'/></clipPath></defs><g id='NFT' clip-path='url(#clip-NFT)'><rect width='636' height='636' fill='#f5f5f5'/><g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#noteBG)'><rect id='noteBG-2' data-name='noteBG' width='563' height='563' transform='translate(37 38)' fill='" +
      color +
      lock +
      ".bodyText{font-size: 16px;font-family: 'Courier';line-height: 1.4rem;text-align: left;}</style><foreignObject x='76' y='130' width='490' height='420'><div xmlns= 'http://www.w3.org/1999/xhtml' > <p id='text' class='bodyText'>" +
      decoded +
      "</p></div></foreignObject></svg>";
    return svgStart;
  } catch (error) {
    let svgStart =
      "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='636' height='636' viewBox='0 0 636 636'><defs><filter id='noteBG' x='28' y='32' width='581' height='581' filterUnits='userSpaceOnUse'><feOffset dy='3' input='SourceAlpha'/><feGaussianBlur stdDeviation='3' result='blur'/><feFlood flood-opacity='0.161'/><feComposite operator='in' in2='blur'/><feComposite in='SourceGraphic'/></filter><clipPath id='clip-path'><path id='Path_1' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5,5.277,5.277,0,0,0-4.91,5c-.021.022,0,1.485,0,1.9h2.076c0-.073-.054-1.523,0-1.9.059-1.078,1.295-2.923,2.834-2.923A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#ff7474'/></clipPath><clipPath id='clip-path-2'><path id='Path_1-2' data-name='Path 1' d='M21.5,6.68V5a5,5,0,0,0-5-5,5.277,5.277,0,0,0-4.91,5c-.021.022,0,1.485,0,1.9h2.076c0-.073-.054-1.523,0-1.9.059-1.078,1.3-2.923,2.834-2.923A2.927,2.927,0,0,1,19.426,5V6.68H9.884V16.851H23.121V6.68ZM17.329,13v2.233H15.677V13a1.462,1.462,0,1,1,1.652,0Z' transform='translate(-9.884)' fill='#ff7474'/></clipPath><clipPath id='clip-NFT'><rect width='636' height='636'/></clipPath></defs><g id='NFT' clip-path='url(#clip-NFT)'><rect width='636' height='636' fill='#f5f5f5'/><g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#noteBG)'><rect id='noteBG-2' data-name='noteBG' width='563' height='563' transform='translate(37 38)' fill='" +
      color +
      lock +
      ".bodyText{font-size: 16px;font-family: 'Courier';line-height: 1.4rem;text-align: left;}</style><foreignObject x='76' y='130' width='490' height='420'><div xmlns= 'http://www.w3.org/1999/xhtml' > <p id='text' class='bodyText'>" +
      "</p></div></foreignObject></svg>";
    console.log(error)
  }
}

/**
 * Main entry point.
 */
window.addEventListener("load", async () => {
  init();
  document.querySelector('input[name="color"]:checked').id = "yellow";
  document.getElementById("noteBody").style.background = "#fff8aa";
  await checkReplyParam()
  await checkDownloadParam()
});

async function checkReplyParam() {
  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const replyTokenId = urlParams.get('reply')
    if (!replyTokenId) {
      return
    }
    console.log("replyTokenId", replyTokenId)
    const sender = await getSender(Number(replyTokenId))
    if (sender) {
      document.getElementById('name').value = sender
      document.getElementById('noteText').placeholder = "Your reply"
    }
  } catch (error) {
    error(error)
  }
}

async function checkDownloadParam() {
  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const downloadTokenId = urlParams.get('note')
    if (!downloadTokenId) {
      return
    }
    console.log("downloadTokenId", downloadTokenId)
    const replyButtonHtml = `
    </a>
      <a href="${window.location.origin}?reply=${downloadTokenId}" target="_self" class="button">
      Reply
    </a>
    `
    const burnLink = `
    </a>
      <a onclick="burnToken(${downloadTokenId})" target="_self" class="burnLink">
      Burn
    </a>
    `
    document.getElementById('StickyTitle').innerText = "Loading..."
    document.getElementById('StickyDescription').innerText = ""
    document.getElementById("noteBody").style.display ="none";
    document.getElementById("tools").style.display ="none";
    document.getElementsByTagName("nav")[0].style.display ="none";
    document.getElementById("downloadFrame").style.display ="block";
    const svg_base64 = await getSVG(Number(downloadTokenId))
    // console.log("svg_base64", svg_base64)
    const svg = atob(svg_base64.replace(/^data:image\/(svg\+xml);base64,/, ''));
    // console.log("svg", svg)
    const StickyData = await getSticky(Number(downloadTokenId))
    const creatorAddress = StickyData?.creator
    const OwnerAddress = await getOwner(Number(downloadTokenId))
    const stickyTitle = StickyData?.title || "StickyNote #" + downloadTokenId
    // document.getElementById("downloadFrame").innerHTML = svg
    document.getElementById("downloadFrame").innerHTML = `
    <a download="${stickyTitle}.svg" href="${svg_base64}" title="${stickyTitle}" class="downloader">
    ${svg}
    </a>
    `
    // rerun svg script
    Array.from(document.querySelector('#downloadFrame>a>svg').querySelectorAll("script")).forEach((script) => {
      try {
        const replacement_script = document.createElement('script')
        replacement_script.appendChild(document.createTextNode(script.innerHTML))
        script.parentNode.replaceChild(replacement_script, script)
      } catch {}
    })
    document.getElementById('StickyTitle').innerText = stickyTitle
    document.getElementById('StickyDescription').innerText = `Sender: ${creatorAddress}`
    document.getElementById('sticky-info').innerHTML = `
    <p>Recipient: ${OwnerAddress}</p>
    ${replyButtonHtml}
    ${burnLink}
    `
    document.getElementById('sticky-info').style.display = "flex"
    // resolve ens
    const displayCreatorAddress = await resolveEns(creatorAddress)
    if (displayCreatorAddress.display_name) {
      document.getElementById('StickyDescription').innerHTML = `
      Sender:
      <a href="https://etherscan.io/address/${displayCreatorAddress.address}" target="_blank">
      <p style="display: inline;">${displayCreatorAddress.display_name}</p>
      `
    }
    const displayOwnerAddress = await resolveEns(OwnerAddress)
    if (displayOwnerAddress.display_name) {
      document.getElementById('sticky-info').innerHTML = `
      <div>
      Recipient: 
      <a href="https://etherscan.io/address/${displayOwnerAddress.address}" target="_blank">
      <p style="display: inline;">${displayOwnerAddress.display_name}</p>
      </a>
      </div>
      ${replyButtonHtml}
      ${burnLink}
      `
    }
  } catch (error) {
    console.log(error)
    error(error)
  }
}

async function resolveEns(address) {
  const endpoint_url = `https://ens.quantum.tech/${address}`
  const response = await fetch(endpoint_url).then((response) => response.json())
  return response
}

function pickColor() {
  var checkRadio = document.querySelector('input[name="color"]:checked').id;

  var colors = {
    orange: "#ffcdaa",
    yellow: "#fff8aa",
    green: "#aaffc8",
    blue: "#aac9ff",
    purple: "#d2aaff",
  };

  if (checkRadio != null) {
    document.getElementById("noteBody").style.background = colors[checkRadio];
    selectedColor = colors[checkRadio];
    document.getElementById("previewFrame").innerHTML = previewSVG();
  }
}

const preview = document.getElementById('toggle1')

preview.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.getElementById("noteBody").style.display ="none";
    document.getElementById("previewFrame").style.display ="block";
    document.getElementById("previewFrame").innerHTML = previewSVG();
    document.getElementById("previewToggle").innerText = "Edit"
  } else {
    document.getElementById("noteBody").style.display = "flex";
    document.getElementById("previewFrame").style.display = "none";
    document.getElementById("previewToggle").innerText = "Preview"
  }
})

function searchToken() {

  var token= document.getElementById("search").value;
  var url = "https://www.stickynotes.wtf/?note="+String(token);

  if(token){
    const link = document.createElement('a');
    link.href=url
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}