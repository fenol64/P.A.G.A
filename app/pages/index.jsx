import { useEffect, useState } from "react";
import { AlertMessage, Button, CardCommitment, Container, Navbar, UserProfilePicture } from "root/components/LayoutComponents";

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
        console.log(commitment);
    }, [commitment]);

    return <main className="">
        <Navbar pageTitle="P.A.G.A" currentPage="home" />

        <section id="pageContent" className="d-flex flex-column gap-3 flex-fill overflow-auto">
            <Container>
                <div className="d-flex flex-column gap-4">

                    {commitments?.length === 0
                        ? <AlertMessage type="info" message="Nenhuma promessa encontrada." iconName="fal fa-info-circle" />
                        : commitments?.map((commitment, index) => {
                            const classVar = [];
                            classVar.push("card", "border-0", "rounded-5", "commitment-card");

                            return <>
                                <div key={index} className={"card border-0 text-white rounded-5 commitment-card"}>
                                    <header className="card-header bg-transparent border-0 p-3 pb-2">
                                        <div className="d-inline-flex flex-row gap-2 align-items-center rounded-pill bg-light text-dark p-1"
                                            data-bs-toggle="modal" data-bs-target="#modalPolitician"
                                            onClick={() => setPolitician(commitment.author)} >
                                            <UserProfilePicture user={commitment.author} size="small" noStatus />
                                            <div className="d-flex flex-column gap-0 small pe-3">
                                                <p className="m-0 small fw-bold">{commitment.author.name}</p>
                                                <p className="m-0 small">{commitment.author.politicianRole}</p>
                                            </div>
                                        </div>
                                    </header>

                                    <div className="card-body p-3">
                                        <h3 className="card-title">{commitment.title}</h3>
                                        <p className="card-text d-flex flex-row gap-3">
                                            <small className="text-muted"><i className="fal fa-calendar me-1" /> {humanDate(commitment.endDate)}</small>
                                            <small className="text-muted"><i className="fal fa-calendar-edit me-1" /> {humanDatePast(commitment.updatedAt)}</small>
                                        </p>
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
                <div className="modal-dialog modal-lg modal-dialog-scrollable  modal-fullscreen-sm-down">
                    <div className="modal-content">
                        {commitment && <>
                            <header className="modal-header bg-transparent border-0 p-2">
                                <div className="d-flex flex-row gap-3 align-items-center p-2" data-bs-toggle="modal" data-bs-target="#modalPolitician" onClick={() => setPolitician(commitment.author)}>
                                    <UserProfilePicture user={commitment.author} size="medium" noStatus />
                                    <div className="d-flex flex-column gap-0 pe-5">
                                        <p className="m-0 fw-bold">{commitment.author.name}</p>
                                        <p className="m-0">{commitment.author.politicianRole}</p>
                                    </div>
                                </div>
                                {politician
                                    ? <Button color="transparent" modal="#modalPolitician" iconName="fal fa-times" className={"ms-auto mb-auto"} onClick={() => setCommitment(null)} />
                                    : <Button color="transparent" data-bs-dismiss="modal" iconName="fal fa-times" className={"ms-auto mb-auto"} onClick={() => setCommitment(null)} />
                                }
                            </header>
                            <div className="modal-body p-3">
                                <div className="">
                                    <p className="lead">{commitment.description}</p>
                                </div>
                            </div>
                            <footer className="modal-footer border-0">
                                <p className="card-text d-flex flex-row gap-3 w-100 mb-3 justify-content-between">
                                    <small className="text-muted"><i className="fal fa-calendar me-1" /> {humanDate(commitment.endDate)}</small>
                                    <small className="text-muted"><i className="fal fa-calendar-edit me-1" /> {humanDatePast(commitment.updatedAt)}</small>
                                </p>
                                <div className="d-flex flex-row gap-3 w-100">
                                    <Button color="danger" iconName="fal fa-thumbs-down" size="lg" rounded="pill px-3" />
                                    <Button color="success" iconName="fal fa-thumbs-up" size="lg" className="flex-fill" rounded="pill px-3" />
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
                                        <UserProfilePicture user={politician} size="lg" noStatus />
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