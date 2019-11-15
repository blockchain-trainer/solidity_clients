const web3 = require('web3');
const express = require('express');


const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("http://localhost:7545"));
//console.log(web3js);

	var account = "0x4d224ffa66C2b309f84b8b424354EB7DeB799A3D";
	var contractAddress = "0x5f6426604c9632df024b071ff69e49ae1a3a8221";   
	var privateKey = "744bd4ed82cdaf58e92a9caa7c473b764c2398fd8694ce8dcc366751d4bfcdae";	
	
	var abi =  [
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var contract = new web3js.eth.Contract(abi, contractAddress);




getValue();
async function getValue(){
	let name = await contract.methods.get().call({from: account});
	console.log(name);
}



