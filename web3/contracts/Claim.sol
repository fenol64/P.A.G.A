// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ClaimContract{

    address public _owner;
    address private _PAGAContract;

    
    enum ClaimStatus { 
        Pendente,
        Revisada,
        Aprovada,
        Rejeitada
    }

    struct Claim {
        uint256 id;
        address author;
        address toPolitician;
        string title;
        string description;
        string coverPictureURI;
        ClaimStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 investment;
    }

    Claim[] public claims;

    modifier onlyPAGAContract() {
        require(msg.sender == _PAGAContract, "Caller is not the PAGA contract");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    constructor(){
        
    }

    function setPagaContract(address _PAGAContractAddress) external onlyPAGAContract {
        require(_PAGAContract == address(0), "PAGA contract already set");
        _PAGAContract = _PAGAContractAddress;
    }

    function createClaim(
        address author,
        address toPolitician,
        string memory _title,
        string memory _description,
        string memory _coverPictureURI,
        uint _investment
    ) external onlyPAGAContract {
        claims.push(Claim(
            claims.length,
            author,
            toPolitician,
            _title,
            _description,
            _coverPictureURI,
            ClaimStatus.Pendente,
            block.timestamp,
            block.timestamp,
            _investment
        ));
    }

    function getClaims() public view returns(Claim[] memory){
        return claims;
    }

    function investClaim(uint256 _claimId, uint256 _investment) external onlyPAGAContract {
        require(_claimId < claims.length, "Claim does not exist");
        require(_investment > 0, "Investment must be greater than zero");

        claims[_claimId].investment += _investment;
    }

}