// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract User {

    enum UserRole {
        VOTER,
        POLITICIAN,
        MODERATOR
    }

    struct UserData {
        address addr;
        string profilePictureURI;
        string politicianParty;
        string name;
        string politicianRole;
        UserRole role;
        uint256 createdAt;
        uint256 updatedAt;
    }

    UserData[] public users; // Dynamic array of UserData

    // Function to create a new user
    function createUser(
        string memory _profilePictureURI,
        string memory _politicianParty,
        string memory _name,
        string memory _politicianRole,
        UserRole _role
    ) public {
        UserData memory newUser = UserData(
            msg.sender,
            _profilePictureURI,
            _politicianParty,
            _name,
            _politicianRole,
            _role,
            block.timestamp,
            block.timestamp
        );
        
        users.push(newUser); // Add the new user to the array
    }

    // Function to get a user by index
    function getUser(address _address) public view returns (UserData memory) {
        require(_address != address(0), "Invalid address");
        
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(_address)) == keccak256(abi.encodePacked(users[i].addr))) {
                return users[i];
            }
        }
        
        revert("User not found");
    }

    // Function to update a user's data
    function updateUser(
        address _address,
        string memory _profilePictureURI,
        string memory _politicianParty,
        string memory _name,
        string memory _politicianRole,
        UserRole _role
    ) public {
        require(_address != address(0), "Invalid address");
        
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(_address)) == keccak256(abi.encodePacked(users[i].addr))) {
                users[i].profilePictureURI = _profilePictureURI;
                users[i].politicianParty = _politicianParty;
                users[i].name = _name;
                users[i].politicianRole = _politicianRole;
                users[i].role = _role;
                users[i].updatedAt = block.timestamp;
                return;
            }
        }
        
        revert("User not found");
    }


    function getAll() public view returns (UserData[] memory) {
        return users;
    }
}