// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private metadataBaseUri;
    uint public maxTokens;
    mapping (bytes32 => uint256) private tokenHashes;

    constructor(uint maxTokens_, string memory metadataBaseUri_, string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        maxTokens = maxTokens_;
        metadataBaseUri = metadataBaseUri_;
    }

    function mintMany(bytes32[] memory hashes_) public onlyOwner {
        for(uint i = 0; i< hashes_.length; i++) {
            mint(hashes_[i]);
        }
    }

    function mint(bytes32 hash_) public onlyOwner {
        require(tokenHashes[hash_] == 0, "Code already used");
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        require(newId <= maxTokens, "Token limit reached");
        _mint(address(this), newId);
        tokenHashes[hash_] = newId;
    }

    function checkCode(string memory code_) public view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(code_));
        uint tokenId = tokenHashes[hash];
        return tokenId != 0;
    }

    function claim(string memory code_) public returns (uint tokenId) {
        bytes32 hash = keccak256(abi.encodePacked(code_));
        tokenId = tokenHashes[hash];
        require(tokenId != 0, "Invalid Code");
        require(ERC721.ownerOf(tokenId) == address(this), "Already claimed");
        _safeTransfer(address(this), msg.sender, tokenId, "");
    }

    function _baseURI() internal view override returns (string memory) {
        return metadataBaseUri;
    }

}
