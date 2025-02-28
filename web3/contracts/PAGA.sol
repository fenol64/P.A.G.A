// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Voter.sol";
import "./Commitment.sol";
import "./Politician.sol";
import "./Claim.sol";

contract PAGAContract {

    address public _owner;
    VoterContract public voterContract;
    CommitmentContract public commitmentContract;
    Politician public politicianContract;
    ClaimContract public claimContract;
    
    constructor(address _voterContract, address _commitmentContract, address _politicianContract, address _claimContract) {
        _owner = msg.sender;
        voterContract = VoterContract(_voterContract);
        commitmentContract = CommitmentContract(_commitmentContract);
        politicianContract = Politician(_politicianContract);
        claimContract = ClaimContract(_claimContract);
        voterContract.setPagaContract(address(this));
        commitmentContract.setPagaContract(address(this));
        politicianContract.setPagaContract(address(this));
        claimContract.setPagaContract(address(this));
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _; 
    }

    function createPolitician(
        string memory _profilePictureURI,
        string memory _politicianParty,
        string memory _name,
        string memory _politicianRole
    ) public {
        politicianContract.createPolitician(msg.sender, _profilePictureURI, _politicianParty, _name, _politicianRole);
    }

    function createCommitment(
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _endDate
    ) public {
        commitmentContract.createCommitment(msg.sender, _title, _description, _image, _endDate);
    }

    function createVoter() public {
        voterContract.createVoter(msg.sender);
    }

    function registerVoter(address politician) public {
        voterContract.registerVoter(msg.sender, politician);
    }

    function vote(uint256 _commitmentId, bool _voteFor) public {
        voterContract.voteOnCommitment(msg.sender, _commitmentId, _voteFor);
        commitmentContract.voteOnCommitment(msg.sender, _commitmentId, _voteFor);
    }

    function executeDaily() public onlyOwner {
        uint256[] memory commitments = commitmentContract.executeDailyJob();
        
        // Verificar se há commitments retornados
        require(commitments.length > 0, "Nenhuma promessa foi processada");

        address[] memory successfulAuthors = commitmentContract.getSuccessfulCommitmentAuthors(commitments);
        
        // Verificar se há políticos para premiar
        require(successfulAuthors.length > 0, "Nenhum politico para premiar");

        politicianContract.increaseBalances(successfulAuthors, 1);

        for (uint i = 0; i < commitments.length; i++) {
            address[] memory correctVoters = commitmentContract.getVotersByVote(
                commitments[i], commitmentContract.getCommitmentStatusBool(commitments[i])
            );

            // Verificar se há eleitores para premiar
            require(correctVoters.length > 0, "Nenhum eleitor votou corretamente");

            voterContract.increaseBalances(correctVoters, 1);
        }
    }


    function createClaim(
        address toPolitician,
        string memory _title,
        string memory _description,
        string memory _coverPictureURI,
        uint _investment
    ) public {
        claimContract.createClaim(msg.sender, toPolitician, _title, _description, _coverPictureURI, _investment);
    }

    function claimInvestment(uint _claimId, uint amount) public {
       uint256 userBalancer = voterContract.getBalance(msg.sender);
       require(userBalancer >= amount, "Saldo insuficiente");
       claimContract.investClaim(_claimId, amount);
       voterContract.decreaseBalance(msg.sender, amount);
    }

}
