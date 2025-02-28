import { ethers } from "ethers";
import Web3 from "web3";
import UserAbi from "./web3/contracts/artifacts/User.abi.json";

export default class UserController {

    contract_addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

    constructor() {
        return this;
    }

    async init() {
        this.provider = new Web3(window.ethereum);
        this.contract = new this.provider.eth.Contract(UserAbi, this.contract_addr);

        return this;
    }

    async getUser(addr) {
        return await this.contract.getUser(addr);
    }

    async getAll() {
        try {
            const users = this.contract.methods.getAll().call();
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }
}