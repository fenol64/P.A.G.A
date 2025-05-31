import Web3 from "web3";
import mainJSON from "../contracts/PAGA.sol/PAGAContract.json";

export default class mainController {

    contract_addr = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

    constructor() {
        return this;
    }

    async init() {
        await this.connectMetamask();
        this.contract = new this.provider.eth.Contract(mainJSON.abi, this.contract_addr);
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
              this.provider = new Web3(window.ethereum);

              console.log("Conta conectada:", accounts[0]);

              return { web3, account: accounts[0] };
            } catch (error) {
              console.error("Erro ao conectar à MetaMask:", error);
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

    async createVoter() {
        try {
            const result = await this.contract.methods.createVoter().call();
            return result;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

    async createPolitician(
        _profilePictureURI,
        _politicianParty,
        _name,
        _politicianRole,

    ) {
        try {
            const result = await this.contract.methods.createPolitician(
                _profilePictureURI,
                _politicianParty,
                _name,
                _politicianRole
            ).call();
            return result;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

    async sendTransaction(
        _from,
        value,
    ) {
        try {
            const result = await this.provider.eth.sendTransaction({
                from: _from,
                to: this.contract_addr,
                value: value,
            });
            return result;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }
}