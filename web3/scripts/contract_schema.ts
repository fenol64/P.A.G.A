const contractSchema = {
    "paga.wasm": {
        name: "paga",
        instanceProps: (data: any) => {
          return JSON.stringify({});
        },
        address: "",
      },
  "electors.wasm": {
    name: "electors",
    instanceProps: (data: any) => {
      return JSON.stringify({
        owner: "neutron1x8y240crs906dcs6l8hzqnwapy0ns05n7utcyq",
        paga_contract: data["paga.wasm"].address,
      });
    },
    address: "",
  },
  "politicians.wasm": {
    name: "politicians",
    instanceProps: (data: any) => {
      return JSON.stringify({
        owner: "neutron1x8y240crs906dcs6l8hzqnwapy0ns05n7utcyq",
        paga_contract: data["paga.wasm"].address,
      });
    },
    address: "",
  },
};

export default contractSchema;