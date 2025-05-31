#!/bin/bash

set -e

echo "Cleaning previous build..."
rm -rf artifacts
mkdir -p artifacts

echo "Building contract using cosmwasm/rust-optimizer..."
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.14.0

echo "Done! Wasm file is in ./artifacts"

