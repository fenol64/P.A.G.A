// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Politician {

    address private _owner;
    address private _PAGAContract;

    struct PoliticianData {
        address addr;
        string egovID;
        string profilePictureURI;
        string politicianParty;
        string name;
        string politicianRole;
        uint256 createdAt;
        uint256 updatedAt;
        bool assigned;
        uint256 balances;
    }

    mapping(address => PoliticianData) public Politicians;
    address[] public PoliticianAddresses; // Array to store all Politician addresses

    event PoliticianCreated(address indexed PoliticianAddress, string name);
    event PoliticianUpdated(address indexed PoliticianAddress, string name);


    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    modifier onlyPAGAContract() {
        require(msg.sender == _PAGAContract, "Caller is not the PAGA contract");
        _;
    }


    constructor() {
        _owner = msg.sender;
    }

    function setPagaContract(address _PAGAContractAddress) public onlyPAGAContract {
        require(_PAGAContract == address(0), "PAGA contract already set");
        _PAGAContract = _PAGAContractAddress;
    }


    // Função para criar um novo Político
    function createPolitician(
        address _politicianAddress,
        string memory _profilePictureURI,
        string memory _politicianParty,
        string memory _name,
        string memory _politicianRole
    ) public {
        require(Politicians[_politicianAddress].addr == address(0), "Politician already exists");

        PoliticianData memory newPolitician = PoliticianData(
            _politicianAddress,
            "egovID",
            _profilePictureURI,
            _politicianParty,
            _name,
            _politicianRole,
            block.timestamp,
            block.timestamp,
            true,
            0
        );

        Politicians[_politicianAddress] = newPolitician;
        PoliticianAddresses.push(_politicianAddress);
        emit PoliticianCreated(_politicianAddress, _name);
    }



    // Função para aumentar o saldo do político (apenas chamada pelo contrato CommitmentContract)
    function increaseBalance(address _politician) public onlyPAGAContract {
        Politicians[_politician].balances += 1;
    }

    function increaseBalances(address[] memory _politician, uint256 _amount) public onlyPAGAContract {

        for (uint256 i = 0; i < _politician.length; i++) {
            Politicians[_politician[i]].balances += _amount;
        }
    }

    // Função para obter um Político por endereço
    function getPolitician(address _address) public view returns (PoliticianData memory) {
        require(_address != address(0), "Invalid address");
        return Politicians[_address];
    }

    // Função para atualizar os dados de um Político
    function updatePolitician(
        address _address,
        string memory _profilePictureURI,
        string memory _politicianParty,
        string memory _name,
        string memory _politicianRole
    ) public {
        require(msg.sender == _address, "You can only update your own profile");
        Politicians[_address].profilePictureURI = _profilePictureURI;
        Politicians[_address].politicianParty = _politicianParty;
        Politicians[_address].name = _name;
        Politicians[_address].politicianRole = _politicianRole;
        Politicians[_address].updatedAt = block.timestamp;

        emit PoliticianUpdated(_address, _name);
    }

    // Função para obter todos os Políticos
    function getAllPoliticians() public onlyPAGAContract view returns (PoliticianData[] memory) {
        uint256 totalPoliticians = PoliticianAddresses.length;
        PoliticianData[] memory allPoliticians = new PoliticianData[](totalPoliticians);

        for (uint256 i = 0; i < totalPoliticians; i++) {
            allPoliticians[i] = Politicians[PoliticianAddresses[i]];
        }
        return allPoliticians;
    }
}
