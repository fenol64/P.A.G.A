import { useEffect, useState } from "react";
import useWeb3 from "root/src/hooks/magic";


function Teste() {
    const web3 = useWeb3();

    useEffect(() => {
        (async () => {
            // const userData = await new UserController().init();

            // console.log("teste");
            // // await userData.createUser({
            // //     profilePictureURI: "teste.png",
            // //     politicianParty: "teste role",
            // //     name: "Fernando",
            // //     politicianRole: "teste",
            // //     role: 1,
            // // });
            // console.log({ data: await userData.getAll() });
            // console.log("end")
        })();
    }, []);

    return <div />;
}

export default Teste;