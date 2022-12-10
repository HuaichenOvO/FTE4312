// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/common/ERC2981.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";


contract GameSpirit is ERC721URIStorage, ERC2981, Ownable{
    constructor() ERC721("GameSpirit", "GS") {
    //_setDefaultRoyalty(msg.sender, 100);
  }
    
    struct NFTInfo {
        string hash;
        uint timestamp;
    }

    string[] private myTmpList = [
    "QmZLTQt3ufsedFAT9UFokPWupHqsXTkjFH323W8JthYwqa",
    "QmWJEUkV14piXRZaPq3d5z9Vh7VaJiJPtdjE9duK7R88a1",
    "QmTdMX7RvwbseUsTNQfuCex6ubupLkNsyRnHMDxgzpWSC3",
    "QmTch8396mWocjkzfBDj5bN5JQYCNTyXNGBvwC2jX2kvLT",
    "QmeFruQH9DiKoJhddB5GEVujQhhNQ8apik1ayxxvSyt6Ja",
    "QmRB8tSQxTf1R6pjtUSA9rpbJtp7t1NbtroKc7TnRrGL4w",
    "QmP1FoHqcufCAzuQLorhH4MpeUK4sd6Tih2D4edcSn365r",
    "QmVPGhov5Mf66Q4zCWoCniadxyr1hZZr3NxJ94vZWGz4AD",
    "QmXAreYrLA2QewfEbDgquVFp33da58aeKXrqGi1ZJ8yz6c",
    "QmWehv73zeV8m4kvWrXSfUVNH3bFu9aWKS9z5qFp3wxfQt",
    "QmdUJxWt1zSn6BybM7ZiHFMHzdr9EQpxNNEvLCm5yP31U3",
    "Qmds9UffmbVMp5CrB2Q5y9r9wUvHPmEtbgQsMcnXGpcW1G",
    "QmeoHozGjjBhdVEXfxBiawPYM5gkuBn1abKZXmNMdz87n1",
    "QmXgB1W4kbJqbhMooKMAUjv1SZPQK3qhv4r8qRjNTq4rxG",
    "QmWj6gTm5RkXnWCieav4BfbofqeSLSfFyhnbvYgWe94Ru2",
    "QmNybYJe29Vf2Dwdb2imjmV9hTtT4ngjdU37XSRa6R1Fi9",
    "QmbjRvSAb7WgTmFrWi1VkpvPiw99tgMi9QRipNy9A4tmBz",
    "QmZfvQ4fqaNu3oabnVg8JYjhZQcCVEGbDLuuSpZTnEtTKV",
    "Qmcyk7o5VHnvarAG5w3FZz9wvz4e21LmsEp7XqUyBjxG2Q",
    "Qma6ja2sM5u7kYTywP4HxYm78iPqs1sbSifBKyd4KyTvj2",
    "QmexWRzecpvAUS9Etqe6uwjFjEDu2z1k5bRfPQKsZsFgbM",
    "QmV3pCVbEuCW5rTLaNFnCLMfWoA5ENsBPLz9jnBu1EXazX",
    "QmdYPd524bneX9NAsYaz9WFqXGe9yek7cwTqEZB2jYhrkh",
    "QmfYGRxbLhMEigewGsTWjUfisWMqWQHcr3YVfjfy3Nm99P",
    "QmXJj4Kbo9yGdMPXFdPiyPmobUVYHZY6ktx2yrm52TnYyR",
    "QmcsRmpwMUBqfVq6wq4zTCQA3ATHDp8bcyLigrmoEikTio",
    "QmbaRyXrPGnaCmsy89vvg2ngqMfxRfJaa2DkjiymXLVqGQ",
    "QmW4syruChYGmXNndh3s2b9w3MTnwcC5DQmJhUb1GJtZjD",
    "QmVFo69ZckMUTR3dK3FLgcKUXckRJ1yNJiqFords5LaetS",
    "QmdE7KSB4FsLXF7tKUXsfcA5Jw4sUjsKLtFCdSC3tBmNry",
    "QmbzVRU5Lr1vgBx2yJB7zXMoCwUzV8P1ztvAEuy7M2Wupg",
    "QmSTRZiUJ8ePYkjVy3dyBC5yzNhbhjtKXMz6PbbTZr8gAJ",
    "QmR9A49nJJgVXDxPLuLPNqyMnWoNfsoNWx9JWP2bUuSjoW",
    "QmNNbkdPJPeScw3gZGnDQxsM7wDKzehZ6inMq2HSqm9SBk",
    "QmNQ9zzfhdbMiTrjaDtkUw8hvozCHrSfWsiUrvycdBmmCu",
    "QmUU1B23MptCLp3ckz6w5pgfZiqtzJCLhshJuxTdXqNBEj",
    "QmbLRwsAtEvK1Q782WHgfG7sizpiRJdFxokcUcRHbMT6sb",
    "QmTYRocRQuDSTdtELYUfkJKZVCGsGGvpWmzbrJN8evggub",
    "QmUrvPakhbM9qYndhRtdN7W7ZQe4bLYHiiR9aK1V7QJn87",
    "QmRzobMtse2UkJYJpJmLM6AEFUN3xx914Ex1dj1ggQVgWk",
    "QmV2NuRXiiuoTaDzm9X1K7kYCpKWQStC6mKdU1QaSnkWMM",
    "Qmd1Zvs3exY1dVGRvbcb8Mj4vDKshVWeYnXMkEayi7L3hN",
    "QmeStKBqYCHvMsG1ANXagaqZbmkZ3iU1rvehgEHvKEsDD5",
    "QmYDRcrxAPTD9EQMnzHSw1PqJB5hE4TNN8ZPYuJfpXVmvP",
    "QmeGSzSoJEQv1YjsK88Qqz6XSdBaBe7csoiqD5wPNNUFfP",
    "QmaN3hHu8fZeAX7RymgMfKsRMzRTWYmoqS8drpmd3pUGe5",
    "QmdnbZnGhLxuTzgHFmAHzTNtUa3wnsbkwmAsQx5bdRkyPw",
    "QmejY4Z2TaqC5kstdUVcWySqK9XjLsaNqmGjcLavE3Eo5J",
    "QmQoEJZh1T5BvtTHtN6pvQrLpQ4SRTSQ8La2oWcR2PP6CY",
    "Qma3DEBmn4FhvYJZCr2d2LHwrjsEZP3sJNzy7EbdjzHzZN"];

    uint totalSupply = 9;
    uint currentOccupancy = 0;

    mapping(address=>NFTInfo[]) spiritTrace;

    function supportsInterface(bytes4 interfaceId)
        public view virtual override(ERC721, ERC2981)
        returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function userSpiritNumber(address _user) public view returns (uint){
        return spiritTrace[_user].length;
    }

    function userSpiritHash(uint index) public view returns (string memory){
        require((index < userSpiritNumber(msg.sender))," serSpiritHash: Index out of range!");
        return spiritTrace[msg.sender][index].hash;
    }

    function userSpiritTime(uint index) public view returns (uint){
        require((index < userSpiritNumber(msg.sender))," userSpiritTime: Index out of range!");
        return spiritTrace[msg.sender][index].timestamp;
    }

    function userMint(address _user, uint256 _timestamp) public{
        require((totalSupply > currentOccupancy), " userMint: No more NFTs can be minted~");
        string memory _hash = myTmpList[currentOccupancy];
        currentOccupancy += 1;
        spiritTrace[_user].push(NFTInfo({hash:_hash, timestamp:_timestamp}));
    }

    function userFeed (address _user, uint _index) public {
        require((_index < userSpiritNumber(_user))," userFeed: Index out of range!");
        spiritTrace[_user][_index].timestamp -= 6*60*60*1000;
    }

    function _test(address a) public view returns (uint256){
        return spiritTrace[a][0].timestamp;
    }

    function _burn(uint256 tokenId)
        internal virtual override {
        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);  
    }

    function burnNFT(uint256 tokenId)
        public {
        _burn(tokenId);
    }

    function mintNFT(address _user)
    public onlyOwner
    returns (uint256) {

        uint256 newItemId = currentOccupancy;
        _safeMint(_user, newItemId);
       // "https://ipfs.io/ipfs/"+myTmpList[currentOccupancy];
        _setTokenURI(newItemId,string.concat( "https://ipfs.io/ipfs/",myTmpList[currentOccupancy]));
        currentOccupancy++;

        return newItemId;
    }


}

