import { useEffect, useState } from "react";
import {
  AlertMessage,
  Button,
  CardCommitment,
  Container,
  ModalCloseButton,
  Navbar,
  UserProfilePicture,
} from "root/components/LayoutComponents";

export const CHAIN_NAME = "cosmoshub";
export const CHAIN_NAME_STORAGE_KEY = "selected-chain";
import mock from "root/data/db.json";
import { humanDate, humanDatePast } from "root/src/utils";
import { useMagic } from "./_app";
import localforage from "localforage";
import mainController from "root/src/controllers/mainController";
import Link from "next/link";
import { Wallet } from "root/components/wallet";

export function ToastMessage({ message, type, iconName }) {
  try {
    const bodyElement = document.querySelector("body");

    var toastElementContainer = document.querySelector(".toast-container");
    if (!toastElementContainer) {
      toastElementContainer = document.createElement("div");
      toastElementContainer.className =
        "toast-container position-fixed bottom-0 end-0 p-3";
      bodyElement.appendChild(toastElementContainer);
    }

    const toastElement = document.createElement("div");
    toastElement.className = `toast bg-${type}`;
    if (type == "danger" || type == "success")
      toastElement.classList.add("text-white");
    else toastElement.classList.add("text-dark");
    toastElement.onclick = () => toastElement.remove();
    toastElementContainer.appendChild(toastElement);

    toastElement.innerHTML = `
            <div class="d-flex flex-row gap-2 align-items-center p-3">
                <i class="${iconName} me-2"></i>
                <strong class="me-auto">${message}</strong>
            </div>
        `;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    toastElement.addEventListener("shown.bs.toast", () => {
      setTimeout(() => toast.hide(), 5000);
    });
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
    });

    return toastElement;
  } catch (error) {
    console.error("Erro ao criar toast:", error);
  }
}

export default function HomePage({ ...props }) {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [userHash, setUserHash] = useState(null);
  const [users, setUsers] = useState(props?.users ?? {});
  const [openAddPromiseModal, setOpenAddPromiseModal] = useState(false);
  const { magic } = useMagic();

  const [votedCommitments, setVotedCommitments] = useState({});

  const [auth_callback, setAuthCallback] = useState(null);
  const [back_modal, setBackModal] = useState(null);

  const [politician, setPolitician] = useState(null);

  const [commitment, setCommitment] = useState(null);
  const [commitments, setCommitments] = useState(props.commitments ?? []);
  const [commitmentsFiltred, setCommitmentsFiltred] = useState(
    props.commitments ?? []
  );

  const commitmentsOfPolitician = (politicianId) => {
    const commitmentsFiltred = commitments?.filter(
      (c) => c.authorId === politicianId
    );
    return commitmentsFiltred;
  };

  const metaMaskAuth = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const maincontroller = await new mainController();
        await maincontroller.init();
        const user_addr = await maincontroller.connectMetamask();
        await localforage.setItem("userHash", user_addr.account);
        await localforage.setItem("type", "metamask");
        setUser(user_addr);

        await authenticatedFeedback();
      } else {
        ToastMessage({
          message: "MetaMask não está instalado em seu dispositivo.",
          type: "warning",
          iconName: "fal fa-exclamation-triangle",
        });
      }
    } catch (error) {
      console.error("Erro ao conectar com Metamask:", error);
      ToastMessage({
        message: "Erro ao conectar com Metamask.",
        type: "danger",
        iconName: "fal fa-exclamation-triangle",
      });
    }
  };

  const sendMetamaskTransaction = async (to, value) => {
    const maincontroller = await new mainController();
    const user_addr = await maincontroller.connectMetamask();
    const res = await maincontroller.sendTransaction(to, value);
    console.log("Transaction sent:", res);
  }

  const magicLinkAuth = async () => {
    try {
      const magic_data = await magic.wallet.connectWithUI();
      await localforage.setItem("userHash", magic_data[0]);

      setUser(magic_data[0]);
      await authenticatedFeedback();
    } catch (error) {
      console.error(error.toString().includes("canceled"));
      if (error?.toString()?.includes("canceled")) {
        ToastMessage({
          message: "Conexão com Magic Link cancelada.",
          type: "warning",
          iconName: "fal fa-exclamation-triangle",
        });
      } else {
        ToastMessage({
          message: "Erro ao conectar com Magic Link.",
          type: "danger",
          iconName: "fal fa-exclamation-triangle",
        });
      }
    }
  };

  const authenticatedFeedback = async () => {
    const userHash = await localforage.getItem("userHash");
    if (userHash) {
      setUserHash(userHash);

      ToastMessage({
        message: "Autenticado com sucesso.",
        type: "success",
        iconName: "fal fa-check",
      });

      if (commitment) openOrCloseModal("modalCommitment").open();
      if (politician) openOrCloseModal("modalPolitician").open();

      const balance = await localforage.getItem("balance");
      if (balance) setBalance(balance);
      const votedCommitments = await localforage.getItem("votedCommitments");
      if (votedCommitments) setVotedCommitments(votedCommitments);

      openOrCloseModal("modalAuth").close();
    }
  };

  const logoutFeedback = async () => {
    await localforage.removeItem("userHash");
    setUserHash(null);
    setUser(null);

    setBalance(0);
    setVotedCommitments({});

    ToastMessage({
      message: "Desconectado com sucesso!",
      type: "info",
      iconName: "fal fa-check",
    });
  };

  const openOrCloseModal = (modalId) => {
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById(modalId)
    );
    return {
      open: () => modal.show(),
      close: () => modal.hide(),
    };
  };

  const applyVote = async (commitmentId, vote) => {
    console.log("Applying vote to commitment", commitmentId, vote);
    const userHash = await localforage.getItem("userHash");
    if (userHash) {
      vote = vote ? "1" : "0";
      // const res = await new CommitmentController().applyCommitmentVote(userHash, commitmentId, vote);
      // console.log("Vote applied", res);

      const res = {};

      if (res?.error) {
        alert("Erro ao votar na promessa.");
        return;
      }

      ToastMessage({
        message: "Voto aplicado com sucesso!",
        type: "success",
        iconName: "fal fa-check",
      });

      var newBalance = parseFloat(
        (balance + Math.floor(Math.random() * 10) / 100).toFixed(2)
      );
      setBalance(newBalance);

      const votedCommitments = await localforage.getItem("votedCommitments");
      if (!votedCommitments) {
        await localforage.setItem("votedCommitments", { [commitmentId]: vote });
      } else {
        await localforage.setItem("votedCommitments", {
          ...votedCommitments,
          [commitmentId]: vote,
        });
      }

      setVotedCommitments({ ...votedCommitments, [commitmentId]: vote });
      // openOrCloseModal("modalCommitment").close();
    } else {
      alert("Você precisa estar autenticado para votar.");
      openOrCloseModal("modalAuth").open();
      return;
    }
  };

  useEffect(() => {
    (async () => {
      // const Web3Commitments = await new CommitmentController();
      // await Web3Commitments.init();
      // const commitments = await Web3Commitments.getCommitments();

      // console.log("Commitments", commitments);

      const userHash = await localforage.getItem("userHash");
      if (userHash) setUserHash(userHash);

      if (userHash) {
        const balance = await localforage.getItem("balance");
        if (balance) setBalance(balance);
        const votedCommitments = await localforage.getItem("votedCommitments");
        if (votedCommitments) setVotedCommitments(votedCommitments);
      }
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        var id = modal.id;

        modal.addEventListener("hidden.bs.modal", () => {
          if (id == "modalAuth") {
            setAuthCallback(null);
            setBackModal(null);
          } else if (id == "modalCommitment") {
            setCommitment(null);
          } else if (id == "modalPolitician") {
            setPolitician(null);
          }
        });
      });
    })();
  }, []);

  useEffect(() => {
    if (balance !== null)
      (async () => await localforage.setItem("balance", balance))();
  }, [balance]);

    const [chainName, setChainName] = useState(CHAIN_NAME);

  function onChainChange(chainName) {
    setChainName(chainName);
  }

  return (
      <main className="">
        <Wallet chainName={chainName} onChainChange={onChainChange} />
      {/* <Navbar pageTitle="P.A.G.A." /> */}
      <section
        id="pageHeaderContainer"
        className="d-flex flex-column gap-3 bg-blue text-white p-3 rounded-bottom-5 pt-5"
      >
        <header
          id="pageHeader"
          className="navbar navbar-dark bg-blue p-0 fixed-top rounded-bottom-5"
        >
          <div className="container-fluid p-3 px-5">
            <h1 className="navbar-brand m-0 fw-bold">PAGA</h1>

            {userHash && (
              <div className="d-flex flex-row gap-3 align-items-center ms-auto">
                <span className="badge bg-green fs-6">
                  <i className="fal fa-coins me-1" /> {balance ?? 0} PC
                </span>
                <Button
                  color="danger"
                  iconName="fal fa-sign-out"
                  size="md"
                  rounded="2"
                  onClick={logoutFeedback}
                />
              </div>
            )}
          </div>
        </header>

        <Container>
          <hgroup className="text-center text-md-start mt-3">
            <h2 className="h3 text-white">Promessa Assinada Gera Atitude</h2>
            <div className="lead text-light">
              <p>
                Aqui você pode acompanhar as promessas feitas por políticos,
                informar se foram cumpridas.
              </p>
              <p>Faça parte da mudança!</p>
            </div>
          </hgroup>

          <div className="d-flex flex-column gap-0 align-items-center">
            <span className="d-block text-center text-dark rounded-top-pill bg-light pt-3 px-4">
              <i className="fal fa-lock fa-3x"></i>
            </span>

            <div className="bg-light text-dark rounded-5 p-4">
              <p>
                Utilizamos a <b>tecnologia blockchain</b> para garantir a{" "}
                <b>transparência e segurança</b> dos dados. Desta forma, cada
                voto e promessa é único e imutável.
              </p>
              <p>E para votar e comentar é necessário autenticar-se.</p>
            </div>
          </div>

          {userHash ? (
            <div className="d-flex flex-column gap-3 align-items-center">
              <h3 className="text-center">Você está autenticado em crypto!</h3>
            </div>
          ) : (<>
            <Button
              color="light"
              label="Entrar para votar"
              iconName="fal fa-fingerprint"
              className="btn-block w-100"
              size="lg"
              rounded="pill p-3"
              modal="#modalAuth"
            />
            <p className="text-center text-white">
                    <Link href="/cadastro" className="text-white h4 text-decoration-none">
                ou <span className="text-decoration-underline">crie uma conta</span>
            </Link>
            </p>
    </>
          )}
        </Container>
      </section>

      <section id="pageContent" className="d-flex flex-column gap-3 py-3">
        <Container
          header={<>

          </>}
          title="Promessas Recentes"
          iconName="fal fa-bullhorn"
          className={"gap-4"}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.target);
              const search = formData.get("search");
              console.log("Searching for", search);

              const commitmentsFiltred = commitments?.filter(
                (c) =>
                  c.title.includes(search) ||
                  c.description.includes(search) ||
                  c.author.name.includes(search)
              );
              setCommitmentsFiltred(commitmentsFiltred);
            }}
            className=""
          >
            <fieldset className="row g-3">
              <div className="col-12 col-md-5">
                <input
                  type="text"
                  name="search"
                  className="form-control rounded-pill form-control-lg"
                  placeholder="Buscar promessas..."
                />
              </div>
              <div className="col-12 col-md-5">
                <select
                  name="commitment_status"
                  className="form-select rounded-pill form-select-lg"
                >
                  <option value="">Todas as promessas</option>
                  <option value="finished">Promessas cumpridas</option>
                  <option value="expired">Promessas não cumpridas</option>
                </select>
              </div>
              <div className="col-12 col-md">
                <Button
                  color="primary"
                  className="btn-block w-100"
                  size="lg"
                  rounded="pill p-3"
                  iconName="fal fa-search"
                />
              </div>
            </fieldset>
          </form>
            <Link href={"/comunidade"} >
                <h3 className="d-block text-center text-decoration-none text-black h4">
                    <i className="fal fa-eye me-1"></i>
                    Ver Promessas feitas comunidade
                </h3>
            </Link>
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
                classVar.push(
                  "card",
                  "border-0",
                  "rounded-5",
                  "commitment-card"
                );

                return (
                  <>
                    <div
                      key={index}
                      className={
                        "card border-0 text-white rounded-5 bg-primary"
                      }
                    >
                      <header className="card-header bg-transparent border-0 p-3 pb-2 d-flex gap-2 align-items-start">
                        <div
                          className="d-inline-flex flex-row gap-2 align-items-center rounded-pill bg-light text-dark p-1 me-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#modalPolitician"
                          onClick={() => setPolitician(commitment.author)}
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
        </Container>

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
                    {politician ? (
                      <ModalCloseButton
                        color="outline-light"
                        rounded="pill"
                        target="#modalPolitician"
                        onClick={() => setCommitment(null)}
                      />
                    ) : (
                      <ModalCloseButton
                        color="outline-light"
                        rounded="pill"
                        dismiss
                        onClick={() => setCommitment(null)}
                      />
                    )}
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
                            {humanDate(commitment.endDate)}
                          </small>
                          <small className="text-muted">
                            <i className="fal fa-calendar-edit me-1" />{" "}
                            {humanDate(commitment.updatedAt, true)}
                          </small>
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
                        <>
                          <h3 className="w-100 text-center">
                            A promessa foi cumprida?
                          </h3>
                          <div className="d-flex flex-row gap-3 w-100 align-items-center justify-content-center p-3">
                            <Button
                              color="danger"
                              iconName="fal fa-thumbs-down fa-2x"
                              size="lg"
                              rounded="pill p-4"
                              onClick={() => applyVote(commitment.id, false)}
                            />
                            <Button
                              color="success"
                              iconName="fal fa-thumbs-up fa-2x"
                              size="lg"
                              rounded="pill p-4"
                              onClick={() => applyVote(commitment.id, true)}
                            />
                          </div>
                        </>
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

        <section
          id="modalPolitician"
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
            <div className="modal-content">
              {politician && (
                <>
                  <header className="modal-header bg-transparent border-0 p-2">
                    {commitment ? (
                      <Button
                        color="transparent"
                        modal="#modalCommitment"
                        iconName="fal fa-times"
                        className={"ms-auto"}
                        onClick={() => setPolitician(null)}
                      />
                    ) : (
                      <Button
                        color="transparent"
                        data-bs-dismiss="modal"
                        iconName="fal fa-times"
                        className={"ms-auto"}
                        onClick={() => setPolitician(null)}
                      />
                    )}
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
                        {commitmentsOfPolitician(politician.id)?.map(
                          (commitment, index) => {
                            return (
                              <li
                                key={index}
                                className="list-group-item p-3 text-start d-flex flex-row gap-3"
                              >
                                <span className="w-75 flex-fill text-overflow">
                                  {commitment.title}
                                </span>

                                <Button
                                  color="light"
                                  className="ms-auto"
                                  iconName="fal fa-eye"
                                  modal="#modalCommitment"
                                  onClick={() => setCommitment(commitment)}
                                />
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  <footer className="modal-footer border-0"></footer>
                </>
              )}
            </div>
          </div>
        </section>
      </section>

      <section
        id="modalAuth"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <header className="modal-header bg-transparent border-0 p-2">
              <ModalCloseButton dismiss />
            </header>
            <div className="modal-body p-3">
              <div className="d-flex flex-column gap-3 align-items-center">
                <h3 className="modal-title">Autenticação</h3>
                <p className="lead">
                  Para votar e comentar é necessário autenticar-se. Escolha um
                  dos serviços abaixo para:
                </p>
                <Button
                  color="light"
                  border="2 border-dark"
                  label="Metamask"
                  className="btn-block w-100"
                  size="lg"
                  rounded="pill p-3"
                  iconName="fal fa-dog"
                  onClick={metaMaskAuth}
                />
                <Button
                  color="light"
                  border="2 border-dark"
                  label="Conta Google"
                  className="btn-block w-100"
                  size="lg"
                  rounded="pill p-3"
                  iconName="fab fa-google"
                  onClick={magicLinkAuth}
                />
              </div>
            </div>
            <footer className="modal-footer border-0"></footer>
          </div>
        </div>
      </section>


    </main>
  );
}

export function getServerSideProps(ctx) {
  const props = {};

  props.users = {};
  mock.users.map((user) => {
    props.users[user.id] = user;
  });

  props.commitments = mock.commitments?.map((commitment) => {
    commitment.author = props.users[commitment.authorId] ?? null;
    return commitment;
  });

  props.claims = [];
  return {
    props,
  };
}
