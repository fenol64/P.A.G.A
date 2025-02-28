import { useEffect, useState } from "react";
import { AlertMessage, Button, CardCommitment, Container, ModalCloseButton, Navbar, UserProfilePicture } from "root/components/LayoutComponents";

import mock from "root/data/db.json";
import { humanDate, humanDatePast } from "root/src/utils";

export default function HomePage({ ...props }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(props?.users ?? {});

    const [politician, setPolitician] = useState(null);

    const [commitments, setCommitments] = useState(props.commitments ?? []);
    const [commitment, setCommitment] = useState(null);

    const commitmentsOfPolitician = (politicianId) => {
        const commitmentsFiltred = commitments?.filter(c => c.authorId === politicianId);
        return commitmentsFiltred;
        return [];
    }

    useEffect(() => {
    }, [commitment]);

    return <main className="">
        {/* <Navbar pageTitle="P.A.G.A." /> */}

        <header id="pageHeader" className="navbar navbar-dark bg-blue p-0 fixed-top rounded-bottom-5">
            <Container className="">
                <h1 className="navbar-brand m-0 fw-bold">PAGA</h1>
            </Container>
        </header>
        <section id="pageHeader" className="d-flex flex-column gap-3 bg-blue text-white p-3 rounded-bottom-5 mt-5">
            <Container>
                <hgroup className="text-center text-md-start">
                    <h2 className="h3 text-white">Participação e Ação Governamental Ativa</h2>
                    <div className="lead text-light">
                        <p>Aqui você pode acompanhar as promessas feitas por políticos, informar se foram cumpridas.</p>
                        <p>Faça parte da mudança!</p>
                    </div>
                </hgroup>

                <div className="d-flex flex-column gap-0 align-items-center">
                    <span className="d-block text-center text-dark rounded-top-pill bg-light pt-3 px-4">
                        <i className="fal fa-lock fa-3x"></i>
                    </span>
                    <div className="bg-light text-dark rounded-5 p-4">
                        <p>Utilizamos a <b>tecnologia blockchain</b> para garantir a <b>transparência e segurança</b> dos dados. Desta forma, cada voto e promessa é único e imutável.</p>
                        <p>Para votar e comentar é necessário autenticar-se.</p>
                    </div>
                </div>
            </Container>
        </section>

        <section id="modalAuth" className="modal fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <header className="modal-header bg-transparent border-0 p-2">
                        <ModalCloseButton dismiss />
                    </header>
                    <div className="modal-body p-3">
                        <h3 className="modal-title">Autenticação</h3>
                        <p className="lead">Para votar e comentar é necessário autenticar-se.</p>
                        <Button color="light" border="2 border-dark" label="Autenticar Metamask" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fab fa-google" />
                        <Button color="light" border="2 border-dark" label="Autenticar com Google" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fab fa-google" />
                    </div>
                    <footer className="modal-footer border-0">
                    </footer>
                </div>
            </div>
        </section>

        <section id="pageContent" className="d-flex flex-column gap-3 py-3">
            <Container title="Promessas Recentes" iconName="fal fa-bullhorn" className={"gap-4"}>
                <form onSubmit={(e) => e.preventDefault()} className="">
                    <fieldset className="row g-3">
                        <div className="col-12 col-md-5">
                            <input type="text" className="form-control rounded-pill form-control-lg" placeholder="Buscar promessas..." />
                        </div>
                        <div className="col-12 col-md-5">
                            <select className="form-select rounded-pill form-select-lg">
                                <option value="">Todas as promessas</option>
                                <option value="">Promessas cumpridas</option>
                                <option value="">Promessas não cumpridas</option>
                            </select>
                        </div>
                        <div className="col-12 col-md">
                            <Button color="primary" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fal fa-search" />
                        </div>
                    </fieldset>
                </form>
                <div className="d-flex flex-column gap-4">
                    {commitments?.length === 0
                        ? <AlertMessage type="info" message="Nenhuma promessa encontrada." iconName="fal fa-info-circle" />
                        : commitments?.map((commitment, index) => {
                            const classVar = [];
                            classVar.push("card", "border-0", "rounded-5", "commitment-card");

                            return <>
                                <div key={index} className={"card border-0 text-white rounded-5 bg-primary"}>
                                    <header className="card-header bg-transparent border-0 p-3 pb-2 d-flex gap-2 align-items-start">
                                        <div className="d-inline-flex flex-row gap-2 align-items-center rounded-pill bg-light text-dark p-1 me-auto"
                                            data-bs-toggle="modal" data-bs-target="#modalPolitician"
                                            onClick={() => setPolitician(commitment.author)} >
                                            <UserProfilePicture user={commitment.author} size="sm" />
                                            <div className="d-flex flex-column gap-0 small pe-3">
                                                <p className="m-0 small fw-bold">{commitment.author.name}</p>
                                                <p className="m-0 small">{commitment.author.politicianRole}</p>
                                            </div>
                                        </div>
                                    </header>

                                    <div className="card-body p-3">
                                        <h3 className="card-title">{commitment.title}</h3>
                                        <p className="text-muted mt-3"><i className="fal fa-bullseye-pointer me-1" /> {humanDatePast(commitment.endDate)}</p>
                                    </div>

                                    <footer className="card-footer p-3 bg-transparent border-0">
                                        <Button color="opacity-light" label="Ver detalhes" className="btn-block w-100" size="sm" rounded="pill p-3"
                                            modal="#modalCommitment"
                                            onClick={() => setCommitment(commitment)}
                                        />
                                    </footer>
                                </div>
                            </>
                        })
                    }
                </div>
            </Container>

            <section id="modalCommitment" className="modal fade">
                <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
                    <div className="modal-content">
                        {commitment && <>
                            <header className="modal-header bg-green text-light border-0 p-3 position-relative rounded-bottom-5">
                                {politician
                                    ? <ModalCloseButton color="outline-light" rounded="pill" target="#modalPolitician" onClick={() => setCommitment(null)} />
                                    : <ModalCloseButton color="outline-light" rounded="pill" dismiss onClick={() => setCommitment(null)} />
                                }

                                <h2 className="navbar-brand text-uppercase text-center w-100 m-2">Promessa</h2>

                                {/* <div className="d-flex flex-column gap-2">
                                    <div className="d-flex flex-row gap-3 align-items-center p-2" data-bs-toggle="modal" data-bs-target="#modalPolitician" onClick={() => setPolitician(commitment.author)}>
                                        <UserProfilePicture user={commitment.author} size="md" />
                                        <div className="d-flex flex-column gap-0 pe-5">
                                            <p className="m-0 fw-bold">{commitment.author.name}</p>
                                            <p className="m-0">{commitment.author.politicianRole}</p>
                                        </div>
                                    </div>
                                </div> */}
                            </header>
                            <div className="modal-body p-3">
                                <div className="d-flex flex-column gap-3">
                                    <hgroup className="mb-3">
                                        <h2>{commitment.title}</h2>

                                        <p className="d-flex flex-row gap-3 w-100 justify-content-between">
                                            <small className="text-muted"><i className="fal fa-bullseye-pointer me-1" /> {humanDate(commitment.endDate)}</small>
                                            <small className="text-muted"><i className="fal fa-calendar-edit me-1" /> {humanDate(commitment.updatedAt, true)}</small>
                                        </p>
                                    </hgroup>

                                    <p className="lead">{commitment.description}</p>

                                    <div className="card bg-light rounded-3">
                                        <div className="d-flex flex-row gap-3 align-items-center p-3" data-bs-toggle="modal" data-bs-target="#modalPolitician" onClick={() => setPolitician(commitment.author)}>
                                            <UserProfilePicture user={commitment.author} size="md" />
                                            <div className="d-flex flex-column gap-0 pe-5">
                                                <p className="m-0 fw-bold">{commitment.author.name}</p>
                                                <p className="m-0">{commitment.author.politicianRole}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card bg-light rounded-3">
                                        <header className="card-header"><h5 className="card-title">Comentários</h5></header>
                                        <div className="card-body">
                                            <p className="lead">Nenhum comentário encontrado.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="modal-footer border-0 text-center">

                                <h3 className="w-100 text-center">A promessa foi cumprida?</h3>
                                <div className="d-flex flex-row gap-3 w-100 align-items-center justify-content-center p-3">
                                    <Button color="danger" iconName="fal fa-thumbs-down fa-2x" size="lg" rounded="pill p-4" />
                                    <Button color="success" iconName="fal fa-thumbs-up fa-2x" size="lg" rounded="pill p-4" />
                                </div>
                            </footer>
                        </>}
                    </div>
                </div>
            </section>

            <section id="modalPolitician" className="modal fade">
                <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
                    <div className="modal-content">
                        {politician && <>
                            <header className="modal-header bg-transparent border-0 p-2">
                                {commitment
                                    ? <Button color="transparent" modal="#modalCommitment" iconName="fal fa-times" className={"ms-auto"} onClick={() => setPolitician(null)} />
                                    : <Button color="transparent" data-bs-dismiss="modal" iconName="fal fa-times" className={"ms-auto"} onClick={() => setPolitician(null)} />
                                }
                            </header>
                            <div className="modal-body p-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-12 col-md-3 text-center">
                                        <UserProfilePicture user={politician} size="lg" />
                                    </div>
                                    <div className="col-12 col-md-9 text-center text-md-start">
                                        <hgroup className="data">
                                            <h2>{politician.name}</h2>
                                            <h5>{politician.politicianRole}</h5>
                                        </hgroup>

                                        <ul className="list-inline d-flex gap-3 flex-wrap">
                                            <li>Promessas feitas: 7</li>
                                            <li>Promessas cumpridas: 1</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-start mt-5">
                                    <h5>Promessas</h5>
                                    <ul className="list-group">
                                        {commitmentsOfPolitician(politician.id)?.map((commitment, index) => {
                                            return <li key={index} className="list-group-item p-3 text-start d-flex flex-row gap-3">
                                                <span className="w-75 flex-fill text-overflow">
                                                    {commitment.title}
                                                </span>

                                                <Button color="light" className="ms-auto" iconName="fal fa-eye" modal="#modalCommitment" onClick={() => setCommitment(commitment)} />
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <footer className="modal-footer border-0">
                            </footer>
                        </>}
                    </div>
                </div>
            </section>
        </section>
    </main>
}

export function getServerSideProps(ctx) {
    const props = {};

    props.users = {};
    mock.users.map((user) => {
        props.users[user.id] = user;
    });

    props.commitments = mock.commitments?.map(commitment => {
        commitment.author = props.users[commitment.authorId] ?? null;
        return commitment;
    });

    props.claims = [];
    return {
        props
    }
}