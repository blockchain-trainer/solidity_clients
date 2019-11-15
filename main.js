const web3 = require('web3');


//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("http://localhost:7545"));
//console.log(web3js);

web3js.eth.getBalance("0x4c51AD1386771C0C3740B44702a049F14d0363c9")
.then(console.log);


