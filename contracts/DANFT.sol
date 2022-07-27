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
    mapping (address => uint) ownerLandCount;

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) // modify/require to make sure the max num of NFT is not passedxx
    {
        _tokenIds.increment();
        require(_tokenIds.current()<=maxIndex, "No more NFTs to mint"); 
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        landToOwner[newItemId] = msg.sender;
        ownerLandCount[msg.sender] = ownerLandCount[msg.sender]+1;
        return newItemId;
    }
    function getAddressById(uint id) public view returns (address)
    {
        return landToOwner[id];
    }
}


contract DAToken is ERC20{
    constructor(uint256 initial_supply)  ERC20("Dvir And Amit Token","DNA"){
        _mint(msg.sender,initial_supply);
    }

}