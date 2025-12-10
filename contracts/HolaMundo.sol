// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HolaMundo {
    string public saludo;

    constructor(string memory _saludo) {
        saludo = _saludo;
    }

    function setSaludo(string memory _saludo) public {
        saludo = _saludo;
    }
}
