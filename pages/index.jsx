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

    useEffect(() => {
        console.log(commitment);
    }, [commitment]);

    return <main className="d-flex flex-column">
        {(!commitment && !politician) && <Navbar pageTitle="P.A.G.A" currentPage="home" />}
        {commitment && <Navbar pageTitle="Promessa" currentPage="commitment" backLink={() => setCommitment(null)} />}
        {politician && <Navbar pageTitle="Político" currentPage="politician" backLink={() => setPolitician(null)} />}
        <section id="pageContent" className="d-flex flex-column gap-3 flex-fill overflow-auto">
            {(!commitment && !politician) && <Container title="Promessas Recentes" icon="fal fa-scroll">
                {commitments?.length === 0
                    ? <AlertMessage type="info" message="Nenhuma promessa encontrada." iconName="fal fa-info-circle" />
                    : commitments?.map((commitment, index) => {
                        const classVar = [];
                        classVar.push("card", "border-0", "rounded-3", "commitment-card");

                        return <>
                            <div key={index} className={classVar.join(" ")}>
                                <header className="card-header bg-transparent border-0 p-2 pb-0">
                                    <div className="d-flex flex-row gap-2 align-items-center">
                                        <UserProfilePicture user={commitment.author} size="small" noStatus />
                                        <div className="d-flex flex-column gap-0 small">
                                            <p className="m-0 small fw-bold">{commitment.author.name}</p>
                                            <p className="m-0 small">{commitment.author.politicianRole}</p>
                                        </div>
                                    </div>
                                </header>
                                <div className="card-body p-3">
                                    <h5 className="card-title">{commitment.title}</h5>
                                    <p className="card-text">{commitment.description}</p>

                                    <p className="card-text"></p>
                                    <small className="text-muted">Data de término: {humanDate(commitment.endDate)}</small>
                                </div>
                                <footer className="card-footer p-2 bg-transparent border-0">
                                    <Button color="light" label="Ver detalhes" className="btn-block w-100" size="sm" onClick={() => {
                                        setCommitment(commitment);
                                    }} />
                                </footer>
                            </div>
                        </>
                    })
                }
            </Container>}

            {commitment && <>
                <Container title={commitment.title}>
                    <p className="lead">{commitment.description}</p>
                    <p><b>Prazo:</b> {humanDate(commitment.endDate)}</p>
                    <p><b>Atualizado:</b> {humanDatePast(commitment.updatedAt)}</p>
                </Container>

                <footer className="fixed-bottom">
                    <Container>
                        <div className="d-flex flex-row gap-2">
                            <Button color="danger" iconName="fal fa-thumbs-down" size="lg" />
                            <Button color="success" iconName="fal fa-thumbs-up" size="lg" className="flex-fill" />
                        </div>
                    </Container>
                </footer>
            </>}

            {politician && <>
                <Container title={politician.name} icon={"fal fa-user-tie"}>

                </Container>
            </>}
        </section>

        <div id="modalCandidato" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <header className="modal-header"></header>
                    <div className="modal-body"></div>
                    <footer className="modal-footer"></footer>
                </div>
            </div>
        </div>
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