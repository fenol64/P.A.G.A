import { execSync } from "child_process";
import { log } from "console";
import { isVerbose } from "../utils";

export const compileCommand = `cargo build --release --target wasm32-unknown-unknown`;

export const optimizeCommand = `docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.14.0`;

export const compileContracts = () => {
  log("compiling contracts...");
    if (isVerbose()){
        log(`| >`, compileCommand);
    }
  execSync(compileCommand, { stdio: isVerbose() ? "inherit" : "ignore" });
  log("Compilation completed successfully!");
};

export const optimizeContracts = () => {
  log("optimizing contracts...");
  if (isVerbose()){
    log(`| >`, optimizeCommand);
  }
  execSync(optimizeCommand, { stdio: isVerbose() ? "inherit" : "ignore" });
  log("Optimization completed successfully!");
};

export const compileProject = () => {
  compileContracts();
  optimizeContracts();
};
