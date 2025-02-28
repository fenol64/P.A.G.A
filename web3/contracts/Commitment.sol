// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CommitmentContract {

    address public _owner;
    address private _PAGAContract;

    // Enum para definir os status das promessas
    enum CommitmentStatus {
        Pendente,
        Cumprida,
        Falhada,
        Cancelada
    }

    // Estrutura para armazenar os dados das promessas
    struct Commitment {
        uint256 id;
        address author;
        string title;
        string description;
        string image;
        CommitmentStatus status;
        uint256 endDate;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) votes; // Mapeamento para armazenar o voto de cada endereço (true = favorável, false = contra)
        address[] voters; // Lista de endereços que votaram
    }

    // Mapeamento para armazenar as promessas, identificadas pelo ID
    mapping(uint256 => Commitment) public commitments;
    uint256 public nextCommitmentId; // Variável para manter o próximo ID único para promessas

    // Array para armazenar todos os IDs de promessas, útil para listar as promessas
    uint256[] public commitmentIds;

    // Eventos para criação, atualização, cancelamento e votação de promessas
    event CommitmentCreated(uint256 indexed id, address indexed author, string title);
    event CommitmentUpdated(uint256 indexed id, address indexed author, CommitmentStatus status);
    event CommitmentSuccess(uint256 indexed id, address indexed author);
    event CommitmentCancelled(uint256 indexed id);
    event VoteCasted(uint256 indexed id, address indexed voter, bool voteFor);

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

    // Função para criar uma nova promessa, somente políticos podem criar
    function createCommitment(
        address _address,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _endDate
    ) public onlyPAGAContract {
        uint256 commitmentId = nextCommitmentId++;

        Commitment storage newCommitment = commitments[commitmentId];
        newCommitment.id = commitmentId;
        newCommitment.author = _address;
        newCommitment.title = _title;
        newCommitment.description = _description;
        newCommitment.image = _image;
        newCommitment.status = CommitmentStatus.Pendente;
        newCommitment.endDate = _endDate;
        newCommitment.createdAt = block.timestamp;
        newCommitment.updatedAt = block.timestamp;

        commitmentIds.push(commitmentId);

        emit CommitmentCreated(commitmentId, msg.sender, _title);
    }

    // Função para votar se a promessa foi cumprida ou não
    function voteOnCommitment(address voter, uint256 _commitmentID, bool _voteFor) public onlyPAGAContract {
        Commitment storage commitment = commitments[_commitmentID];

        // Verificar se o usuário já votou
        require(!commitment.votes[voter], "You have already voted on this commitment");
        require(commitment.status == CommitmentStatus.Pendente, "Cannot vote on a commitment that is not pending");

        // Armazenar o voto do usuário (true = favorável, false = contra)
        commitment.votes[voter] = _voteFor;

        // Adicionar o eleitor à lista de votantes
        commitment.voters.push(voter);

        // Contabilizar os votos
        if (_voteFor) {
            commitment.votesFor++;
        } else {
            commitment.votesAgainst++;
        }

        emit VoteCasted(_commitmentID, voter, _voteFor);
    }

    function getVotersByVote(uint256 _commitmentId, bool _voteFor) public view returns (address[] memory) {
        Commitment storage commitment = commitments[_commitmentId];
        uint256 count = 0;

        // Contar quantos votantes votaram no tipo especificado
        for (uint256 i = 0; i < commitment.voters.length; i++) {
            if (commitment.votes[commitment.voters[i]] == _voteFor) {
                count++;
            }
        }

        // Criar um array com o tamanho correto
        address[] memory voters = new address[](count);
        uint256 index = 0;

        // Preencher o array com os votantes que votaram no tipo especificado
        for (uint256 i = 0; i < commitment.voters.length; i++) {
            if (commitment.votes[commitment.voters[i]] == _voteFor) {
                voters[index] = commitment.voters[i];
                index++;
            }
        }

        return voters;
    }

    // Função para atualizar o status da promessa com base nos votos
    function updateCommitmentStatus(uint256 _id) private returns (bool) {
        Commitment storage commitment = commitments[_id];

        if (commitment.votesFor > commitment.votesAgainst) {
            commitment.status = CommitmentStatus.Cumprida;
            commitment.updatedAt = block.timestamp;
            emit CommitmentSuccess(_id, commitment.author);
            return true;
        }

        commitment.status = CommitmentStatus.Falhada;
        emit CommitmentSuccess(_id, commitment.author);
        return false;
    }

    // Função para cancelar uma promessa, somente o autor pode cancelar
    function cancelCommitment(uint256 _id) public {
        Commitment storage commitment = commitments[_id];

        require(commitment.author == msg.sender, "Only the author can cancel the commitment");
        require(commitment.status != CommitmentStatus.Cumprida, "Cannot cancel a fulfilled commitment");

        commitment.status = CommitmentStatus.Cancelada;
        commitment.updatedAt = block.timestamp;

        emit CommitmentCancelled(_id);
    }

    function getCommitmentStatus(uint256 _commitmentId) public view returns (CommitmentStatus) {
        return commitments[_commitmentId].status;
    }


    function executeDailyJob() public onlyPAGAContract returns (uint256[] memory) {
        uint256[] memory updatedCommitments = new uint256[](commitmentIds.length);
        uint256 index = 0;

        for (uint256 i = 0; i < commitmentIds.length; i++) {
            uint256 commitmentId = commitmentIds[i];
            Commitment storage commitment = commitments[commitmentId];

            if (commitment.endDate < block.timestamp && commitment.status == CommitmentStatus.Pendente) {
                updateCommitmentStatus(commitmentId);
                updatedCommitments[index] = commitment.id;
                index++;
            }
        }

        return updatedCommitments;
    }

    // Função que recebe um array de commitmentIds e retorna um array de endereços dos autores de todas as promessas com sucesso
    function getSuccessfulCommitmentAuthors(uint256[] memory _commitmentIds) public view returns (address[] memory) {
        uint256 count = 0;

        // Contar quantas promessas foram cumpridas
        for (uint256 i = 0; i < _commitmentIds.length; i++) {
            if (commitments[_commitmentIds[i]].status == CommitmentStatus.Cumprida) {
                count++;
            }
        }

        // Criar um array com o tamanho correto
        address[] memory authors = new address[](count);
        uint256 index = 0;

        // Preencher o array com os autores das promessas cumpridas
        for (uint256 i = 0; i < _commitmentIds.length; i++) {
            if (commitments[_commitmentIds[i]].status == CommitmentStatus.Cumprida) {
                authors[index] = commitments[_commitmentIds[i]].author;
                index++;
            }
        }

        return authors;
    }

    function getCommitmentStatusBool(uint256 _commitmentId) public view returns (bool) {
        return commitments[_commitmentId].status == CommitmentStatus.Cumprida;
    }

    function getCommitmentAuthor(uint256 _commitmentId) external view returns (address) {
        return commitments[_commitmentId].author;
    }

    // Função auxiliar para converter uint256 para string (simples)
    function uint2str(uint256 _i) private pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}
