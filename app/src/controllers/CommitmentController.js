import Web3 from "web3";
import commitmentJSON from "../contracts/Commitment.sol/CommitmentContract.json";

export default class CommitmentController {

    contract_addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

    constructor() {
        return this;
    }

    async init() {
        this.provider = new Web3(window.ethereum);
        this.contract = new this.provider.eth.Contract(commitmentJSON.abi, this.contract_addr);
        console.log("Contrato carregado:", this.contract);
        return this;
    }

    async getCommitments() {
        await this.init()
        console.log("getCommitment", this.contract);
        return await this.contract._methods.getAllCommitments().call();
    }


}