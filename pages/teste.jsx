import { useEffect, useState } from "react";
import UserController from "root/src/controllers/UserController";


function Teste() {


    useEffect(() => {
        (async () => {
            const userData = await new UserController().init();

            console.log("teste");
            // await userData.createUser({
            //     profilePictureURI: "teste.png",
            //     politicianParty: "teste role",
            //     name: "Fernando",
            //     politicianRole: "teste",
            //     role: 1,
            // });
            console.log({ data: await userData.getAll() });
            console.log("end")
        })();
    }, []);

    return <div />;
}

export default Teste;