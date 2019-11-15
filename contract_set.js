const web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction




//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("http://localhost:7545"));
//console.log(web3js);

	var account = "0x4c51AD1386771C0C3740B44702a049F14d0363c9";
	var contractAddress = "0x5f6426604c9632df024b071ff69e49ae1a3a8221";   
	var privateKey = "bda2eaa4e921aab5bb11074ea564a87752618e7cac82a8b33da995cffe2f0aee";

	const privBuffer = Buffer.from(
	  privateKey,
	  'hex',
	)
	
	
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


var rawOlder = contract.methods.set(190).encodeABI();

web3js.eth.getTransactionCount(account, function (err, nonce) {

var tx = new EthereumTx({
		      nonce: nonce,
		      gasPrice: web3.utils.toHex(web3.utils.toWei('200', 'gwei')),
		      gasLimit: 4700000,
		      to: contractAddress,
		      value: 0,
		      data: rawOlder,
		    });

 tx.sign(privBuffer);
var raw = '0x' + tx.serialize().toString('hex');
 web3js.eth.sendSignedTransaction(raw, function (err, transactionHash) {
		    	if (err) {
		    		console.log(err);	
		    		
		    	} else{
		    		console.log(transactionHash);
		    	}
		    });

});


