import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
{
    // we are in the browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else
{
    // we are on the server *OR* the user is not running metamask
    // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
    const provider = new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/o75z189RoZwqc0Bpa8IPpKrMkduNlNOq");
    web3 = new Web3(provider);
}

export default web3;