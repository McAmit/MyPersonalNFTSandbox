//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract DANFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint maxIndex = 2500;
    constructor() ERC721("LandNFT", "D&A.Ltd") {}
    mapping (uint => address) private landToOwner;
    mapping (address => uint ) private ownerToLand;
    mapping (address => uint) ownerLandCount;
    mapping (uint256=>uint) priceById;
    

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) // modify/require to make sure the max num of NFT is not passedxx
    {
        require(_tokenIds.current()<=maxIndex, "No more NFTs to mint"); 
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        landToOwner[newItemId] = msg.sender;
        ownerToLand[msg.sender]=newItemId;
        ownerLandCount[msg.sender] = ownerLandCount[msg.sender]+1;
        _tokenIds.increment();
        return newItemId;
    }
    function setPrice(uint price)public onlyOwner {
        priceById[ownerToLand[msg.sender]]=price;
    }
    function getPriceById(uint256 id)public view returns(uint){
        return priceById[id];
    }

    function getAddressById(uint id) public view returns (address)
    {
        return landToOwner[id];
    }
}


contract DAToken is ERC20{
        
    constructor()  ERC20("Dvir And Amit Token","DNA"){
        _mint(msg.sender,1000000*10**18); // 1m tokens, decimals are 18
    }


}
