// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "../@truffle/Console.sol";

function toAsciiString(address x) pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

function char(bytes1 b) pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
}

// interface //
interface GameSpirit {
    function userMint(address _user, uint256 _timestamp) external;
    function userFeed (address _user, uint _index) external;
    function _test(address a) external view returns (uint256);
}

contract GameProfile {
    address GAME_SPIRIT_ADDRESS = 0x5F505b774Ab63bd1e688806Ef4872ed60B080849;

    struct profile {
        string userName;
        uint mintTimes;
        uint gamePoints;
        uint gameItems;
        bool exists;
    }

    mapping(address => profile) _userProfile;

    function setUpProfile (string calldata _name) public {
        require (!_userProfile[msg.sender].exists, "profile already exist!");
        _userProfile[msg.sender] = profile({userName:_name, mintTimes: 0, gamePoints:100, gameItems:2, exists:true});
    }

    // ---------------------------------------------------------------------------------------------

    function readExist () public view returns (bool){
        return _userProfile[msg.sender].exists;
    }

    function readName() public view returns (string memory) {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        return _userProfile[msg.sender].userName;
    }

    function readTime() public view returns (uint) {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        return _userProfile[msg.sender].mintTimes;
    }
    
    function readPoint() public view returns (uint) {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        return _userProfile[msg.sender].gamePoints;
    }

    function readItem() public view returns (uint) {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        return _userProfile[msg.sender].gameItems;
    }

    function changeName(string calldata _name) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        _userProfile[msg.sender].userName = _name;
    }

    // ---------------------------------------------------------------------------------------------

    function addBeans(uint _point) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        _userProfile[msg.sender].gamePoints += _point;
    }
    
    function spendBeans(uint _point) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        require((_userProfile[msg.sender].gamePoints>_point), "game points not enough!");
        _userProfile[msg.sender].gamePoints -= _point;
    }

    function addItem(uint _item) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        _userProfile[msg.sender].gameItems += _item;
    }

    // ---------------------------------------------------------------------------------------------

    function determinMintFee() public view returns (uint) {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        uint _times = _userProfile[msg.sender].mintTimes;
        if (_times < 10) return 40;
        else if (_times < 50) return 50;
        else if (_times < 100) return 60;
        else return (60 + (_times-100)/10);
    }
    
    function feed(uint _index) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        require((_userProfile[msg.sender].gameItems> 0), "game items not enough!");
        // require ((GameSpirit(GAME_SPIRIT_ADDRESS)), "A smart contract is not deployed yet!");
        _userProfile[msg.sender].gameItems -= 1;
        (GameSpirit(GAME_SPIRIT_ADDRESS)).userFeed (msg.sender, _index); 
    }

    // cheating!!!
    function mint(uint _hours) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        // require ((GameSpirit(GAME_SPIRIT_ADDRESS)), "A smart contract is not deployed yet!");
        uint fee = determinMintFee();
        require ((_userProfile[msg.sender].gamePoints >= fee), "You don't have enough points!");
        spendBeans(fee);

        (GameSpirit(GAME_SPIRIT_ADDRESS)).userMint (msg.sender, block.timestamp*1000 + _hours*60*60*1000);
        _userProfile[msg.sender].mintTimes += 1;
    }

    function buyPoint(uint itemNumber) public {
        require (_userProfile[msg.sender].exists, "profile not exist!");
        require((_userProfile[msg.sender].gamePoints >= itemNumber*5), "game items not enough!");
        spendBeans(itemNumber*5);
        addItem(itemNumber);
    }

    function test(address a) public view returns (uint256){
        // string memory res = "[GP] Not called...";
        // res =  (GameSpirit(GAME_SPIRIT_ADDRESS))._test();
        uint256 res =  (GameSpirit(GAME_SPIRIT_ADDRESS))._test(a);

        return res;
    }
}
