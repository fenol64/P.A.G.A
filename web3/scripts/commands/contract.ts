import { log } from "console";
import contractSchema from "../contract_schema";
import { TContractName } from "../types/type";
import { execSync } from "child_process";
import { getContractByCodeIdCommand } from "./commands";

export const listContractsByCodeId = async (codeId: string) => {
    const commandString = getContractByCodeIdCommand(codeId);
    const listCommand = execSync(commandString, { encoding: "utf8" })

    return listCommand
      .split("- ")[1]
      .split("\n")[0]
      .trim();
  };

export const listContracts = (contractShemaData: typeof contractSchema) => {
    log("listing contract addresses:");
    for (const contract in contractShemaData) {
      const current_obj = contractShemaData[contract as TContractName];
      log(`${current_obj.name}: ${current_obj.address}`);
    }
  };