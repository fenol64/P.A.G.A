export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const contract_path = "artifacts/";

export const isVerbose = () => process.env.VERBOSE === "true" ? true : false;