// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VoterContract {

    address public _owner;
    address private _PAGAContract;


    struct Voter {
        address voterAddress;
        address chosenPolitician;
        uint256 balance;
        mapping(uint256 => bool) votedCommitments;
    }

    mapping(address => Voter) public voters;
    address[] public voterAddresses;

    event VoterRegistered(address indexed voter, address indexed politician);
    event VoteRecorded(address indexed voter, uint256 indexed commitmentId);
    event TokensAwarded(address indexed voter, uint256 amount);
    event IssueReported(address indexed voter, string description, uint256 priority);
    event AllPoliticiansReset();

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

    function setPagaContract(address _PAGAContractAddress) public onlyOwner {
        require(_PAGAContract == address(0), "PAGA contract already set");
        _PAGAContract = _PAGAContractAddress;
    }


    function createVoter(address _address) public {
        require(voters[_address].voterAddress == address(0), "Voter already exists");

        voters[_address].voterAddress = _address;
        voters[_address].chosenPolitician = address(0);
        voters[_address].balance = 0;

        voterAddresses.push(_address);

        emit VoterRegistered(_address, address(0));
    }



    function registerVoter(address user, address _politician) external onlyPAGAContract {
        require(voters[user].voterAddress == address(0), "Voter already registered");

        voters[user].chosenPolitician = _politician;
        voters[user].balance = 0;

        emit VoterRegistered(user, _politician);
    }

    function voteOnCommitment(address voter, uint256 _commitmentId, bool vote_for) external onlyPAGAContract {
        require(!voters[voter].votedCommitments[_commitmentId], "Already voted on this commitment");
        voters[voter].votedCommitments[_commitmentId] = vote_for;

        emit VoteRecorded(voter, _commitmentId);
    }

    function increaseBalances(address[] memory _voters, uint256 _amount) external onlyPAGAContract {
        for (uint256 i = 0; i < _voters.length; i++) {
            voters[_voters[i]].balance += _amount;
        }
        emit TokensAwarded(_voters[0], _amount);
    }

    function decreaseBalance(address _voter, uint256 _amount) external onlyPAGAContract {
        voters[_voter].balance -= _amount;
    }

    function resetAllChosenPoliticians() external onlyOwner {
        for (uint256 i = 0; i < voterAddresses.length; i++) {
            voters[voterAddresses[i]].chosenPolitician = address(0);
        }
        emit AllPoliticiansReset();
    }
}
