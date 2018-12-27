if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/27c5c0ce5a7c46a4ada174d27bf8ecd7"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.accounts);
const contractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "string"
			}
		],
		"name": "setValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_target",
				"type": "address"
			}
		],
		"name": "getValue",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "",
				"type": "address"
			}
		],
		"name": "map",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = '0x2164f9cc9fea7640cf8c414bde94186dcd065055';
const contract = web3.eth.contract(contractAbi).at(contractAddress);
// const myFunc = async () => {
//     try {
//         const myAccounts = await web3.eth.getAccounts();
//         console.log(myAccounts)
//         return myAccounts;

//     } catch (err) {
//         console.log(err);
//     }
// }

// myFunc()
function submitForm(form_id) {
    if (form_id == 'get') {
        let address = document.querySelector('.get-input').value;
		console.log(address);
		// contract.getValue.call(address, {from: web3.eth.defaultAccount})
		// 	.then(result => {
		// 		document.querySelector('.result').innerHTML = result;
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	})
		contract.getValue.call(address, {from: web3.eth.defaultAccount}, function(error, result){
			if(!error) {
				console.log(result);
				document.querySelector('.result').innerHTML = result;
			} else {
				console.log(error);
			}
		});

    } else {
        contract.setValue.sendTransaction(document.querySelector('.set-input').value, {from: web3.eth.defaultAccount}, function(error){
			if(!error) {
				console.log("NICE");
			} else {
				console.log(error);
			}
		});
    }
    return false;
}