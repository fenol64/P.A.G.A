import Web3 from "web3";
import politicianJSON from "../contracts/Politician.sol/Politician.json";

export default class PoliticianController {

    contract_addr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

    constructor() {
        return this;
    }

    async init() {
        this.provider = new Web3(window.ethereum);
        this.contract = new this.provider.eth.Contract(politicianJSON.abi, this.contract_addr);
        console.log("Contrato carregado:", this.contract);
        return this;
    }

    async getPoliticians(politicianID = null) {
        await this.init();
        if (politicianID) {
            return await this.contract.methods.getPolitician(politicianID).call();
        } else {
            return await this.contract.methods.getAllPoliticians().call();
        }
    }

    async savePolitician(data, politicianID = null) {
        await this.init();
        const accounts = await this.provider.eth.getAccounts();
        if (politicianID) {
            return await this.contract.methods.updatePolitician(politicianID, data.name, data.role, data.image).send({ from: accounts[0] });
        } else {
            return await this.contract.methods.createPolitician(accounts[0], data.name, data.role, data.image).send({ from: accounts[0] });
        }
    }

    async applyCommitmentVote(userID, commitmentID, vote) {
        await this.init();
        return await this.contract.methods.voteOnCommitment(commitmentID, vote).send({ from: userID });
    }
}
