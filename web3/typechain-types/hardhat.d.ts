/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ClaimContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ClaimContract__factory>;
    getContractFactory(
      name: "CommitmentContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CommitmentContract__factory>;
    getContractFactory(
      name: "PAGAContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PAGAContract__factory>;
    getContractFactory(
      name: "Politician",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Politician__factory>;
    getContractFactory(
      name: "VoterContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VoterContract__factory>;

    getContractAt(
      name: "ClaimContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ClaimContract>;
    getContractAt(
      name: "CommitmentContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CommitmentContract>;
    getContractAt(
      name: "PAGAContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.PAGAContract>;
    getContractAt(
      name: "Politician",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Politician>;
    getContractAt(
      name: "VoterContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VoterContract>;

    deployContract(
      name: "ClaimContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ClaimContract>;
    deployContract(
      name: "CommitmentContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CommitmentContract>;
    deployContract(
      name: "PAGAContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PAGAContract>;
    deployContract(
      name: "Politician",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Politician>;
    deployContract(
      name: "VoterContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VoterContract>;

    deployContract(
      name: "ClaimContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ClaimContract>;
    deployContract(
      name: "CommitmentContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CommitmentContract>;
    deployContract(
      name: "PAGAContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PAGAContract>;
    deployContract(
      name: "Politician",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Politician>;
    deployContract(
      name: "VoterContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VoterContract>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
