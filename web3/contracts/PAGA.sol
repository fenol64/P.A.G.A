// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Voter.sol";
import "./Commitment.sol";
import "./Politician.sol";

contract PAGAContract {

    address public _owner;
    VoterContract public voterContract;
    CommitmentContract public commitmentContract;
    Politician public politicianContract;

    constructor(address _voterContract, address _commitmentContract, address _politicianContract) {
        _owner = msg.sender;
        voterContract = VoterContract(_voterContract);
        commitmentContract = CommitmentContract(_commitmentContract);
        politicianContract = Politician(_politicianContract);
        voterContract.setPagaContract(address(this));
        commitmentContract.setPagaContract(address(this));
        politicianContract.setPagaContract(address(this));
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
        politicianContract.increaseBalances(commitmentContract.getSuccessfulCommitmentAuthors(commitments), 1);
        for (uint i = 0; i < commitments.length; i++) {
            voterContract.increaseBalances(commitmentContract.getVotersByVote(commitments[i],
                commitmentContract.getCommitmentStatusBool(commitments[i])), 1);
        }
    }


}
