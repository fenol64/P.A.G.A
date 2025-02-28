import { ethers } from "ethers";
import Web3 from "web3";
import UserAbi from "./web3/contracts/artifacts/User.abi.json";

export default class UserController {

    contract_addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    constructor() {
        return this;
    }

    async init() {
        await this.connect();
        this.contract = new this.provider.eth.Contract(UserAbi.abi, this.contract_addr);
        return this;
    }

    async connectMetamask() {
        if (window.ethereum) {
            try {
              // Solicita acesso à carteira do usuário
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });

              // Cria uma instância do Web3
              const web3 = new Web3(window.ethereum);

              console.log("Conta conectada:", accounts[0]);

              return { web3, account: accounts[0] };
            } catch (error) {
              return { error: error };
            }
          } else {
            console.error("MetaMask não está instalada!");
          }
    }

    async getUser(addr) {
        return await this.contract.getUser(addr);
    }

    async getUserAddress() {
        return await this.provider.eth.getAccounts();
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