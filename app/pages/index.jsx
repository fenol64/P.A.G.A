import { useEffect, useState } from "react";
import { AlertMessage, Button, CardCommitment, Container, ModalCloseButton, Navbar, UserProfilePicture } from "root/components/LayoutComponents";

import mock from "root/data/db.json";
import {  humanDate, humanDatePast } from "root/src/utils";
import { useMagic } from "./_app";
import localforage from "localforage";
import CommitmentController from "root/src/controllers/CommitmentController";
import mainController from "root/src/controllers/mainController";

export function ToastMessage({ message, type, iconName }) {
    try {
        const bodyElement = document.querySelector("body");

        const toastElementContainer = document.createElement("div");
        toastElementContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
        bodyElement.appendChild(toastElementContainer);

        const toastElement = document.createElement("div");
        toastElement.className = `toast bg-${type} text-white rounded-5`;
        toastElement.onclick = () => toastElement.remove();
        toastElementContainer.appendChild(toastElement);

        toastElement.innerHTML = `
            <div class="toast-header">
                <i class="${iconName} me-2"></i>
                <strong class="me-auto">${message}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener("shown.bs.toast", () => {
            setTimeout(() => toast.hide(), 5000);
        });
        toastElement.addEventListener("hidden.bs.toast", () => {
            toastElement.remove();
            toastElementContainer.remove();
        });

        return toastElement;

    } catch (error) {
        console.error("Erro ao criar toast:", error);
    }
}

export default function HomePage({ ...props }) {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [userHash, setUserHash] = useState(null);
    const [users, setUsers] = useState(props?.users ?? {});
    const { magic } = useMagic();

    const [auth_callback, setAuthCallback] = useState(null);
    const [back_modal, setBackModal] = useState(null);

    const [politician, setPolitician] = useState(null);

    const [commitment, setCommitment] = useState(null);
    const [commitments, setCommitments] = useState(props.commitments ?? []);
    const [commitmentsFiltred, setCommitmentsFiltred] = useState(props.commitments ?? []);


    const commitmentsOfPolitician = (politicianId) => {
        const commitmentsFiltred = commitments?.filter(c => c.authorId === politicianId);
        return commitmentsFiltred;
    }

    const metaMaskAuth = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const maincontroller = await new mainController();
            maincontroller.init();
            const user_addr = await maincontroller.connectMetamask();
            await localforage.setItem('userHash', user_addr.account);
            await localforage.setItem('type', 'metamask');
            setUser(user_addr);

            const commitments = await new CommitmentController().init();



            console.log({commitments_data: await commitments.getCommitments()});
        }
    }

    const magicLinkAuth = async () => {
        const magic_data = await magic.wallet.connectWithUI();
        localforage.setItem("userHash", magic_data);

        setUser(magic_data);
        await authenticatedFeedback();
    }

    const authenticatedFeedback = async () => {
        const userHash = await localforage.getItem("userHash");
        if (userHash) {
            setUserHash(userHash);
            console.log("User hash", userHash);

            alert("Autenticado com sucesso!");

            if (commitment) openOrCloseModal("modalCommitment").open();
            if (politician) openOrCloseModal("modalPolitician").open();

            openOrCloseModal("modalAuth").close();
        }
    }

    const openOrCloseModal = (modalId) => {
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById(modalId));
        return {
            open: () => modal.show(),
            close: () => modal.hide()
        }
    }

    const applyVote = async (commitmentId, vote) => {
        console.log("Applying vote to commitment", commitmentId, vote);
        const userHash = await localforage.getItem("userHash");
        if (userHash) {
            const res = await new CommitmentController().applyVote(userHash, commitmentId, vote);
            console.log(res);

            if (res?.error) {
                alert("Erro ao votar na promessa.");
                return;
            }


        } else {
            alert("Você precisa estar autenticado para votar.");
            openOrCloseModal("modalAuth").open();
            return;
        }
    }

    useEffect(() => {
        (async () => {
            const userHash = await localforage.getItem("userHash");
            if (userHash) {
                setUserHash(userHash);
                console.log("User hash", userHash);
            }
        })();
    }, []);

    return <main className="">
        {/* <Navbar pageTitle="P.A.G.A." /> */}


        <section id="pageHeaderContainer" className="d-flex flex-column gap-3 bg-blue text-white p-3 rounded-bottom-5 pt-5">
            <header id="pageHeader" className="navbar navbar-dark bg-blue p-0 fixed-top rounded-bottom-5">
                <Container className="">
                    <h1 className="navbar-brand m-0 fw-bold">PAGA</h1>
                </Container>
            </header>

            <Container>
                <hgroup className="text-center text-md-start mt-3">
                    <h2 className="h3 text-white">Promessa Assinada Gera Atitude</h2>
                    <div className="lead text-light">
                        <p>Aqui você pode acompanhar as promessas feitas por políticos, informar se foram cumpridas.</p>
                        <p>Faça parte da mudança!</p>
                    </div>
                </hgroup>

                <Button color="primary" onClick={() => ToastMessage({ message: "Teste", type: "success", iconName: "fal fa-check" })} label="Testar Toast" />

                <div className="d-flex flex-column gap-0 align-items-center">
                    <span className="d-block text-center text-dark rounded-top-pill bg-light pt-3 px-4">
                        <i className="fal fa-lock fa-3x"></i>
                    </span>
                    <div className="bg-light text-dark rounded-5 p-4">
                        <p>Utilizamos a <b>tecnologia blockchain</b> para garantir a <b>transparência e segurança</b> dos dados. Desta forma, cada voto e promessa é único e imutável.</p>
                        <p>E para votar e comentar é necessário autenticar-se.</p>
                    </div>
                </div>

                {userHash
                    ? <div className="d-flex flex-column gap-3 align-items-center">
                        <h3 className="text-center">Você está autenticado em crypto!</h3>
                        <p>Seu saldo: <span className="badge bg-green fs-6"><i className="fal fa-coins me-1" /> {balance ?? 0} PC</span></p>
                        <Button color="danger" label="Desconectar" iconName="fal fa-sign-out" className="btn-block w-100" size="lg" rounded="pill p-3" onClick={async () => {
                            await localforage.removeItem("userHash");
                            setUserHash(null);
                        }} />
                    </div>
                    : <Button color="light" label="Entrar para votar" iconName="fal fa-fingerprint" className="btn-block w-100" size="lg" rounded="pill p-3" modal="#modalAuth" />
                }
            </Container>
        </section>

        <section id="pageContent" className="d-flex flex-column gap-3 py-3">
            <Container title="Promessas Recentes" iconName="fal fa-bullhorn" className={"gap-4"}>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const formData = new FormData(e.target);
                    const search = formData.get("search");
                    console.log("Searching for", search);

                    const commitmentsFiltred = commitments?.filter(c => c.title.includes(search) || c.description.includes(search) || c.author.name.includes(search));
                    setCommitmentsFiltred(commitmentsFiltred);

                }} className="">
                    <fieldset className="row g-3">
                        <div className="col-12 col-md-5">
                            <input type="text" name="search" className="form-control rounded-pill form-control-lg" placeholder="Buscar promessas..." />
                        </div>
                        <div className="col-12 col-md-5">
                            <select name="commitment_status" className="form-select rounded-pill form-select-lg">
                                <option value="">Todas as promessas</option>
                                <option value="finished">Promessas cumpridas</option>
                                <option value="expired">Promessas não cumpridas</option>
                            </select>
                        </div>
                        <div className="col-12 col-md">
                            <Button color="primary" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fal fa-search" />
                        </div>
                    </fieldset>
                </form>

                <div className="d-flex flex-column gap-4">
                    {commitmentsFiltred?.length === 0
                        ? <AlertMessage type="info" message="Nenhuma promessa encontrada." iconName="fal fa-info-circle" />
                        : commitmentsFiltred?.map((commitment, index) => {
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
                                <h2 className="navbar-brand text-uppercase text-center w-100 m-2">Detalhes da Promessa</h2>
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

                            {userHash
                                ? <footer className="modal-footer border-0 text-center">
                                    <h3 className="w-100 text-center">A promessa foi cumprida?</h3>
                                    <div className="d-flex flex-row gap-3 w-100 align-items-center justify-content-center p-3">
                                        <Button color="danger" iconName="fal fa-thumbs-down fa-2x" size="lg" rounded="pill p-4" onClick={() => applyVote(commitment.id, false)} />
                                        <Button color="success" iconName="fal fa-thumbs-up fa-2x" size="lg" rounded="pill p-4" onClick={() => applyVote(commitment.id, true)} />
                                    </div>
                                </footer>
                                : <footer className="modal-footer border-0 text-center">
                                    <Button color="light" label="Entrar para votar" iconName="fal fa-fingerprint" className="btn-block w-100" border="2" size="lg" rounded="pill p-3" modal="#modalAuth" />
                                </footer>
                            }
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

        <section id="modalAuth" className="modal fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <header className="modal-header bg-transparent border-0 p-2">
                        <ModalCloseButton dismiss />
                    </header>
                    <div className="modal-body p-3">
                        <div className="d-flex flex-column gap-3 align-items-center">

                            <h3 className="modal-title">Autenticação</h3>
                            <p className="lead">Para votar e comentar é necessário autenticar-se. Escolha um dos serviços abaixo para:</p>
                            <Button color="light" border="2 border-dark" label="Metamask" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fal fa-dog" onClick={metaMaskAuth} />
                            <Button color="light" border="2 border-dark" label="Conta Google" className="btn-block w-100" size="lg" rounded="pill p-3" iconName="fab fa-google" onClick={magicLinkAuth} />
                        </div>
                    </div>
                    <footer className="modal-footer border-0">
                    </footer>
                </div>
            </div>
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