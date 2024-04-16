// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";



contract MyContract is ERC721Base, PermissionsEnumerable {
    bytes32 public constant NICKNAMER_ROLE = keccak256("NICKNAMER_ROLE");

      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NICKNAMER_ROLE, msg.sender);
    }

    // mapping of tokenId to thenick name
    mapping(uint => string) public tokenNicknames;

    // update the value of the mapping for a tokenId
    function updateTokenNickName(uint _tokenId, string calldata _nickname) public onlyRole(NICKNAMER_ROLE){
        tokenNicknames[_tokenId] = _nickname;
    }

}