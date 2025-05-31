import localforage from "localforage";
import number_format from "locutus/php/strings/number_format";
import React, { useEffect } from "react";
import {
  AlertMessage,
  Button,
  Container,
  ModalCloseButton,
  UserProfilePicture,
} from "root/components/LayoutComponents";
import db from "root/data/db.json";
import { humanDate, humanDatePast } from "root/src/utils";
import { ToastMessage } from "..";

// import { Container } from './styles';

function comunidade() {
  const [commitments, setCommitments] = React.useState([]);
  const [commitmentsFiltred, setCommitmentsFiltred] = React.useState([]);
  const [votedCommitments, setVotedCommitments] = React.useState([]);
  const [commitment, setCommitment] = React.useState(null);
  const [politician, setPolitician] = React.useState(null);
  const [userHash, setUserHash] = React.useState(null);
  const [users, setUsers] = React.useState(db.users);

  const openOrCloseModal = (modalId) => {
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById(modalId)
    );
    return {
      open: () => modal.show(),
      close: () => modal.hide(),
    };
  };

  useEffect(() => {
    const fetchCommitments = async () => {
     const commits = await localforage.getItem("user_commitments");

      const data = db.users_commitments;
      const full_data = [...(commits ?? []), ...data]
      setCommitments(full_data);
      setCommitmentsFiltred(full_data);
      const userHash = await localforage.getItem("userHash");
      setUserHash(userHash);
    };

    fetchCommitments();
  }, []);

  return (
    <div>
      <header
        id="pageHeader"
        className="navbar navbar-dark bg-blue p-0 fixed-top rounded-bottom-5"
      >
        <div className="container-fluid p-3 px-5">
          <h1 className="navbar-brand m-0 fw-bold">PAGA</h1>
        </div>
      </header>
      <div
        style={{
          marginTop: "100px",
        }}
      ></div>
      <Container
        iconName={"fal fa-users"}
        className="bg-light"
        title={"Promessas da Comunidade"}>
            <input
            type="text"
            className="form-control rounded-pill form-control-lg mb-4"
            placeholder="Pesquisar por título ou político"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setCommitmentsFiltred(
                commitments.filter((commitment) => {
                  return (
                    commitment.title.toLowerCase().includes(value) ||
                    commitment.author.name.toLowerCase().includes(value)
                  );
                })
              );
            }}
            />
        <Button
          color="primary"
          label="Adicionar uma Sugestão"
          className="btn-block w-100 mb-4"
          size="lg"
          rounded="pill p-3"
          iconName="fal fa-plus"
          modal="#modalAddPromise"
        />
        <div className="d-flex flex-column gap-4">
          {commitmentsFiltred?.length === 0 ? (
            <AlertMessage
              type="info"
              message="Nenhuma promessa encontrada."
              iconName="fal fa-info-circle"
            />
          ) : (
            commitmentsFiltred?.map((commitment, index) => {
              const classVar = [];
              classVar.push("card", "border-0", "rounded-5", "commitment-card");

              return (
                <>
                  <div
                    key={index}
                    className={"card border-0 text-white rounded-5 bg-primary"}
                  >
                    <header className="card-header bg-transparent border-0 p-3 pb-2 d-flex gap-2 align-items-start">
                      <div
                        className="d-inline-flex flex-row gap-2 align-items-center rounded-pill bg-light text-dark p-1 me-auto"
                        data-bs-toggle="modal"
                        data-bs-target="#modalPolitician"
                        //   onClick={() => setPolitician(commitment.author)}
                      >
                        <UserProfilePicture
                          user={commitment.author}
                          size="sm"
                        />
                        <div className="d-flex flex-column gap-0 small pe-3">
                          <p className="m-0 small fw-bold">
                            {commitment.author.name}
                          </p>
                          <p className="m-0 small">
                            {commitment.author.politicianRole}
                          </p>
                        </div>
                      </div>
                      <p className="m-0 text-muted small p-2">
                        {votedCommitments[commitment.id] !== undefined ? (
                          votedCommitments[commitment.id] == 1 ? (
                            <i className="fas fa-thumbs-up fa-2x text-light" />
                          ) : (
                            <i className="fas fa-thumbs-down fa-2x text-danger" />
                          )
                        ) : (
                          ""
                        )}
                      </p>
                    </header>

                    <div className="card-body p-3">
                      <h3 className="card-title">{commitment.title}</h3>
                      <p className="text-muted mt-3">
                        <i className="fal fa-bullseye-pointer me-1" />{" "}
                        {humanDatePast(commitment.endDate)}
                      </p>
                    </div>

                    <footer className="card-footer p-3 bg-transparent border-0">
                      <Button
                        color="opacity-light"
                        label="Ver detalhes"
                        className="btn-block w-100"
                        size="sm"
                        rounded="pill p-3"
                        modal="#modalCommitment"
                        onClick={() => setCommitment(commitment)}
                      />
                    </footer>
                  </div>
                </>
              );
            })
          )}
        </div>
        <section
          id="modalCommitment"
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
            <div className="modal-content">
              {commitment && (
                <>
                  <header className="modal-header bg-green text-light border-0 p-3 position-relative rounded-bottom-5">
                    <ModalCloseButton
                      color="outline-light"
                      rounded="pill"
                      dismiss
                      onClick={() => setCommitment(null)}
                    />
                    <h2 className="navbar-brand text-uppercase text-center w-100 m-2">
                      Detalhes da Promessa
                    </h2>
                  </header>
                  <div className="modal-body p-3">
                    <div className="d-flex flex-column gap-3">
                      <hgroup className="mb-3">
                        <h2>{commitment.title}</h2>

                        <p className="d-flex flex-row gap-3 w-100 justify-content-between">
                          <small className="text-muted">
                            <i className="fal fa-bullseye-pointer me-1" />{" "}
                                                      </small>
                          <small className="text-muted">
                            <i className="fal fa-calendar-edit me-1" />{" "}
                            {humanDate(commitment.updatedAt, true)}
                          </small>
                        </p>
                        <p className="text-muted">
                          {number_format(
                            commitment.current_funding_amount,
                            2,
                            ",",
                            "."
                          )}{" "}
                          PCs foram investidos nesta promessa
                        </p>
                      </hgroup>

                      <p className="lead">{commitment.description}</p>

                      <div className="card bg-light rounded-3">
                        <div
                          className="d-flex flex-row gap-3 align-items-center p-3"
                          data-bs-toggle="modal"
                          data-bs-target="#modalPolitician"
                          onClick={() => setPolitician(commitment.author)}
                        >
                          <UserProfilePicture
                            user={commitment.author}
                            size="md"
                          />
                          <div className="d-flex flex-column gap-0 pe-5">
                            <p className="m-0 fw-bold">
                              {commitment.author.name}
                            </p>
                            <p className="m-0">
                              {commitment.author.politicianRole}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card bg-light rounded-3">
                        <header className="card-header">
                          <h5 className="card-title">Comentários</h5>
                        </header>
                        <div className="card-body">
                          <p className="lead">Nenhum comentário encontrado.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {userHash ? (
                    <footer className="modal-footer border-0 text-center">
                      {votedCommitments[commitment.id] !== undefined ? (
                        <div className="w-100">
                          <AlertMessage
                            type={`${
                              votedCommitments[commitment.id] == 1
                                ? "success"
                                : "warning"
                            } text-center justify`}
                            message={`Você já votou nesta promessa como ${
                              votedCommitments[commitment.id] == 1
                                ? "Promessa cumprida"
                                : "Promessa não cumprida"
                            }`}
                            iconName="fal fa-info-circle"
                          />
                        </div>
                      ) : (
                        <div className="w-100">
                          <p htmlFor="contribution" className="h1 text-left">
                            Doar:
                          </p>
                          <div className="w-100 d-flex flex-col justify-content-center align-items-center">
                            <div className="d-flex flex-row gap-3">
                              <input
                                type="text"
                                placeholder="0"
                                className="w-100 form-control"
                                id="contribution"
                              />
                              <Button
                                color="success"
                                label=""
                                iconName="fal fa-check"
                                className="btn-block w-100"
                                border="2"
                                size="md"
                                rounded="pill p-3"
                                onClick={() => {
                                  setCommitment((prev) => ({
                                    ...prev,
                                    current_funding_amount:
                                      prev.current_funding_amount +
                                      parseFloat(
                                        document.getElementById("contribution")
                                          .value
                                      ),
                                  }));
                                  setCommitmentsFiltred((prev) => {
                                    const index = prev.findIndex(
                                      (item) => item.id === commitment.id
                                    );
                                    if (index !== -1) {
                                      const updatedCommitments = [...prev];
                                      updatedCommitments[index] = {
                                        ...updatedCommitments[index],
                                        current_funding_amount:
                                          updatedCommitments[index]
                                            .current_funding_amount +
                                          parseFloat(
                                            document.getElementById(
                                              "contribution"
                                            ).value
                                          ),
                                      };
                                      return updatedCommitments;
                                    }
                                    return prev;
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </footer>
                  ) : (
                    <footer className="modal-footer border-0 text-center">
                      <Button
                        color="light"
                        label="Entrar para votar"
                        iconName="fal fa-fingerprint"
                        className="btn-block w-100"
                        border="2"
                        size="lg"
                        rounded="pill p-3"
                        modal="#modalAuth"
                      />
                    </footer>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </Container>
      <section
        id="modalAddPromise"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
          <div className="modal-content">
            <header className="modal-header bg-green text-light border-0 p-3 position-relative rounded-bottom-5">
              <ModalCloseButton color="outline-light" rounded="pill" dismiss />
              <h2 className="navbar-brand text-uppercase text-center w-100 m-2">
                Adicionar uma Sugestão
              </h2>
            </header>
            <div className="modal-body p-3">
              <div className="d-flex flex-column gap-3">
                <hgroup className="mb-3">
                  <h2>Adicionar uma nova sugestão</h2>
                </hgroup>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const title = formData.get("title");
                    const description = formData.get("description");
                    const endDate = formData.get("endDate");

                    console.log(
                      "Adding new promise",
                      title,
                      description,
                      endDate
                    );
                    // create a transaction to add a new promise
                    const userHash = await localforage.getItem("userHash");

                    // setBalance((prev) => prev - 0.01);
                    const newCommitment = {
                      id: Math.floor(Math.random() * 1000000),
                      politicianId: formData.get("politician"),
                      author: {
                          profilePictureURI: "https://apphub.com.br/pp.png",
                        name: "Fernando Oliveira",
                        politicianRole: "Dev",
                        id: userHash,
                      },
                      title,
                      description,
                      authorId: userHash,
                      createdAt: "2025-01-01T00:00:00Z",
                      updatedAt: "2025-01-10T00:00:00Z",
                      current_funding_amount: 0,
                        total_funding_amount: 0,
                        current_funding_percentage: 0
                    };
                    localforage.setItem("user_commitments", [
                      ...((await localforage.getItem("user_commitments")) ??
                        []),
                      newCommitment,
                    ]);

                    ToastMessage({
                      message: "Promessa adicionada com sucesso!",
                      type: "success",
                      iconName: "fal fa-check",
                    });

                    openOrCloseModal("modalAddPromise").close();
                    location.reload();
                  }}
                  className="d-flex flex-column gap-3"
                >
                  <fieldset className="row g-3">
                    <div className="col-12 col-md-12">
                      <select
                        name="politician"
                        className="form-select rounded-pill form-select-lg"
                        required
                      >
                        <option value="">Selecione o político</option>
                        {Object.values(users).map((user, index) => {
                          return (
                            <option key={index} value={user.id}>
                              {user.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-12 col-md-12">
                      <input
                        type="text"
                        name="title"
                        className="form-control rounded-pill form-control-lg"
                        placeholder="Título da promessa"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-12">
                      <textarea
                        name="description"
                        className="form-control rounded-3 form-control-lg"
                        placeholder="Descrição da promessa"
                        rows={5}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-12">
                      <input
                        type="text"
                        name="fee"
                        className="form-control rounded-pill form-control-lg"
                        placeholder="Valor da promessa (em PC)"
                        defaultValue={0.01}
                        disabled
                      />
                    </div>
                    <AlertMessage
                      type="info"
                      message="O valor da promessa será descontado de sua conta."
                      iconName="fal fa-info-circle"
                      className="text-center"
                    />
                  </fieldset>
                  <Button
                    type="submit"
                    color="success"
                    label="Adicionar promessa"
                    iconName="fal fa-plus"
                    className="btn-block w-100"
                    size="lg"
                    rounded="pill p-3"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default comunidade;
