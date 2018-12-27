pragma solidity 0.5.2;

contract XSS {

    mapping(address => string) public map;

    constructor() public {
        map[msg.sender] = "AXE IS ATTACK";
    }

    function setValue(string memory _value) public {
        map[msg.sender] = _value;
    }

    function getValue(address _target) public view returns(string memory) {
        return map[_target];
    }
}
