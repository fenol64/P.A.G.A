import { useEffect, useState } from "react";
import { AlertMessage, UserProfilePicture } from "root/components/LayoutComponents";
import UserController from "root/src/controllers/UserController";
import { Api } from "root/src/services";



export default function HomePage({ ...props }) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    const fetchUsers = async (user_addr = null) => {
        setLoading(true);
        setUsers([]);
        try {
            const userController = new UserController();
            const getUsers = await userController.getUsers(user_addr);

            console.log("Usuários carregados:", getUsers);
            if (getUsers?.error) throw new Error(getUsers.error);
            if (getUsers.length > 0) {
                const users = Object.keys(getUsers).map((key) => {
                    const user = getUsers[key];
                    user.id = key;
                    return user;
                });

                setUsers(users);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    }

    return <main className="d-flex flex-column h-100">
        <button className="btn btn-primary" onClick={fetchUsers}>Carregar usuários</button>

        {loading && <AlertMessage type="info" message="Carregando usuários..." />}
        {users.length > 0 && <AlertMessage type="success" message="Usuários carregados com sucesso!" />}
        {users.length === 0 && <AlertMessage type="warning" message="Nenhum usuário encontrado!" />}
        <div className="container">
            <div className="row">
                {users.map((user, index) => {
                    return <div className="col-12 col-md-4" key={index}>
                        <UserProfilePicture user={user} />
                    </div>
                })}
            </div>
        </div>
    </main>
}