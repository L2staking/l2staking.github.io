export const gluonABI = [
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "string",
        "name": "version",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "Activated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "appOwner",
        "type": "address"
      }
    ],
    "name": "AppOwnerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "appOwner",
        "type": "address"
      }
    ],
    "name": "AppOwnerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "AppProvisioned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "AppRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "logic",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "activationBlock",
        "type": "uint256"
      }
    ],
    "name": "ProposalAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "ProposalRemoved",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "activate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address[]",
        "name": "toBeAdded",
        "type": "address[]"
      }
    ],
    "name": "addAppOwners",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "addProposal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "app",
    "outputs": [
      {
        "internalType": "address",
        "name": "current",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "proposal",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "activationBlock",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "appOwners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "apps",
    "outputs": [
      {
        "internalType": "address",
        "name": "proposal",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "activationBlock",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "current",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "depositEther",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "depositToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "disapprove",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "getAppOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "history",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "isAnyLogic",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "appOwner",
        "type": "address"
      }
    ],
    "name": "isAppOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "owners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "provisionApp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address[]",
        "name": "appOwners_",
        "type": "address[]"
      }
    ],
    "name": "registerApp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "address[]",
        "name": "toBeRemoved",
        "type": "address[]"
      }
    ],
    "name": "removeAppOwners",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "removeOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      }
    ],
    "name": "removeProposal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalAppsCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "from",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "to",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint32",
        "name": "appId",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]