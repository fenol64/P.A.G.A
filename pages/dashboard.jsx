import { useEffect, useState } from "react";
import { AlertMessage, UserProfilePicture } from "root/components/LayoutComponents";
import { Api } from "root/src/services";



export default function HomePage({ ...props }) {
    const [loading, updateLoading] = useState(true); // id do loading (ex: "voting", "userUpdate")
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [commitments, setCommitments] = useState([]);
    const [claims, setClaims] = useState([]);

    const userLogin = async (token) => { }
    const userLogout = async () => { }

    const fetchUsers = async (id = null) => {
        try {
            // const params = {};
            // if (id) params.id = id;
            // const request = await Api.get("/users", { params });
            // const response = request.data;

            // const usersObject = response.users;
            // Object.keys(response.users).forEach(key => {
            //     usersObject[key].id
            // });

            // const sortedUsers = Object.values(usersObject).sort((a, b) => a.name.localeCompare(b.name));
            // setUsers(Object.values(sortedUsers));

            // return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    const fetchCommitments = async () => { }
    const fetchClaims = async () => { }

    const applyUserVote = async (userId, vote) => { }
    const applyCommitmentVote = async (commitmentId, vote) => { }
    const applyClaimComment = async (claimId, vote) => { }

    useEffect(() => {
        fetchUsers();
    }, []);

    return <main className="d-flex flex-column h-100">
        <header className="navbar navbar-dark bg-dark p-0">
            <div className="container-fluid container-lg p-3">
                <a className="navbar-brand" href="#">P.A.G.A</a>
            </div>
        </header>

        <div id="pageContent" className="d-flex flex-column gap-2 flex-fill overflow-auto">
            <section id="politiciansSection" className="">
                <header className="bg-dark py-3 border-bottom">
                    <div className="container-fluid container-lg p-3">
                        <hgroup className="d-flex flex-column gap-2">
                            <h1 className="section-title">Candidatos</h1>
                            <p className="section-description">Administrar candidatos</p>
                        </hgroup>
                    </div>
                </header>
                <div className="container-fluid container-lg p-3">
                    <div className="row g-3">
                        <div className="col-12 col-md-5">
                            <form id="newPoliticianForm" className="card rounded-3">
                                <fieldset className="card-body p-3">
                                    <div className="mb-3">
                                        <label htmlFor="newPoliticianName" className="form-label">Nome</label>
                                        <input type="text" id="newPoliticianName" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPoliticianRole" className="form-label">Cargo</label>
                                        <input type="text" id="newPoliticianRole" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPoliticianParty" className="form-label">Partido</label>
                                        <input type="text" id="newPoliticianParty" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPoliticianProfilePicture" className="form-label">Foto de Perfil</label>
                                        <input type="text" id="newPoliticianProfilePicture" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPoliticianDescription" className="form-label">Descrição</label>
                                        <textarea id="newPoliticianDescription" className="form-control"></textarea>
                                    </div>
                                </fieldset>
                                <footer className="card-footer p-3">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </footer>
                            </form>
                        </div>
                        <div className="col-12 col-md-7">

                            <div id="politiciansCard" className="card h-100">
                                <header className="card-header">
                                    <h2 className="card-title">Candidatos</h2>
                                </header>
                                <ul className="list-group list-group-flush">
                                    {users?.length == 0 && <AlertMessage type="info" flush message="Nenhum usuário encontrado" icon="info-circle" />}
                                    {users.map((user, index) => <li key={index} className="list-group-item d-flex gap-3 align-items-center">
                                        <UserProfilePicture user={user} size="medium" />
                                        <h4 className="m-0 fs-6">
                                            <strong>{user.name}</strong>
                                            <small className="d-block text-muted">{user.politicianRole}</small>
                                        </h4>
                                    </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container p-2">
                <div className="row gap-3">
                    <div className="col-12 col-md-4">
                        <form id="newPoliticianForm" className="card">
                            <header className="card-header">
                                <h2 className="card-title">Adicionar Candidato</h2>
                            </header>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="newPoliticianName" className="form-label">Nome</label>
                                    <input type="text" id="newPoliticianName" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPoliticianRole" className="form-label">Cargo</label>
                                    <input type="text" id="newPoliticianRole" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPoliticianParty" className="form-label">Partido</label>
                                    <input type="text" id="newPoliticianParty" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPoliticianProfilePicture" className="form-label">Foto de Perfil</label>
                                    <input type="text" id="newPoliticianProfilePicture" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPoliticianDescription" className="form-label">Descrição</label>
                                    <textarea id="newPoliticianDescription" className="form-control"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Adicionar</button>
                            </div>
                        </form>
                        <div id="politiciansCard" className="card">
                            <header className="card-header">
                                <h2 className="card-title">Candidatos</h2>
                            </header>
                            {(users?.length == 0)
                                ? <AlertMessage type="info" message="Nenhum usuário encontrado" icon="info-circle" />
                                : <ul className="list-group list-group-flush">
                                    {users.map((user, index) => <li key={index} className="list-group-item d-flex gap-3 align-items-center">
                                        <UserProfilePicture user={user} size="medium" />
                                        <h4 className="m-0 fs-6">
                                            <strong>{user.name}</strong>
                                            <small className="d-block text-muted">{user.politicianRole}</small>
                                        </h4>
                                    </li>)}
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-lg p-3">
                <div className="card border rounded-3 border-primary border-2 shadown-sm" id="candidateInfo">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <img src="https://placehold.co/128x128" alt="" className="d-block rounded-circle border border-2 border-primary w-50 mx-auto" id="candidateProfilePicture" />
                            </div>
                            <div className="col-12 col-md-8">
                                <hgroup className="d-flex flex-column gap-2" id="candidateNameRole">
                                    <h2 className="card-title" id="candidateName">NOME CANDIDATO</h2>
                                    <h3 className="card-subtitle" id="candidateRole">CARGO</h3>
                                </hgroup>
                                <p className="card-text" id="candidateDescription">DESCRIÇÃO</p>

                            </div>
                            <ul className="list-group list-group-flush" id="candidateCommitments">
                                <li className="list-group-item d-flex justify-content-between align-items-center candidateCommitment">
                                    <span className="candidateCommitmentText">
                                        <h4 className="candidateCommitmentTitle">TÍTULO</h4>
                                        <p className="candidateCommitmentDescription">DESCRIÇÃO</p>
                                    </span>
                                    <span className="candidateCommitmentVotes badge bg-primary rounded-pill">VOTOS</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer className="card-footer"></footer>
                </div>
            </div>
        </div>
    </main>
}

export async function getServerSideProps(context) {



    return {
        props: {}
    }
}