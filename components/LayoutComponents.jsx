import Head from "next/head";
import { humanDate } from "root/src/utils";

export function Button({ label, color, size, children, ...props }) {
    const classVar = [];
    classVar.push("btn");
    classVar.push(`btn-${size ?? "md"}`);
    classVar.push(`btn-${color ?? "secondary"}`);

    classVar.push("d-inline-flex", "flex-row", "align-items-center", "justify-content-center", "rounded-3", "border-0", "fw-bold", "text-uppercase p-3");

    props.className && classVar.push(props.className);

    const onClick = props.onClick ?? (() => { console.log("Button clicked") });

    return <button type="button" className={classVar.join(" ")} onClick={onClick}>
        {props.iconName && <i className={`${props.iconName}`}></i>}
        {label && <span>{label}</span>}
        {children}
    </button>
}

export function Navbar({ pageTitle, currentPage, backLink }) {
    return <header className="navbar navbar-dark bg-black p-0 border-bottom border-dark">
        <div className="container-fluid p-2 gap-2">
            {backLink
                ? <Button iconName="fal fa-chevron-left" color="dark" size="lg" onClick={backLink} />
                : <Button iconName="fal fa-home" color="transparent text-black" size="lg" />
            }
            <h1 className="navbar-brand my-0 mx-auto">{pageTitle ?? "P.A.G.A"}</h1>
            <Button iconName="fal fa-user" color="dark" size="lg" />
        </div>
    </header>
}

export function Container({ title, icon, description, sizeLimit, children }) {
    var style = {};
    // if (sizeLimit) style.maxWidth = sizeLimit;
    style.maxWidth = "40rem";
    return <div className="container-fluid container-lg d-flex flex-column gap-3 p-3" style={style}>
        {(title || description || icon) && <header>
            <hgroup className="d-flex flex-row gap-3">
                {icon && <i className={`${icon} fa-2x`}></i>}
                {title && <h2>{title}</h2>}
            </hgroup>
            {description && <p>{description}</p>}
        </header>}
        {children}
    </div>
}

export function CardCommitment({ commitment, ...props }) {
    const classVar = [];
    classVar.push("card", "border-0", "rounded-3", "commitment-card");

    // var statusBackground = "bg-primary";
    // // if (commitment.status === 0) statusBackground = "border-warning text-black";
    // // else
    // if (commitment.status === 1) statusBackground = "border-success text-white";
    // else if (commitment.status === 2) statusBackground = "border-danger text-white";
    // classVar.push(statusBackground);

    const setCommitment = props.setCommitment ?? {};

    return <>
        <div className={classVar.join(" ")}>
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
            {/* <div className="card-footer d-flex flex-row gap-2 p-2 border-0 bg-transparent">
            <Button color="danger" iconName="fal fa-thumbs-down" className="flex-fill" />
            <Button color="success" iconName="fal fa-thumbs-up" className="flex-fill" />
        </div> */}
        </div>
    </>
}



export const UserProfilePicture = ({ user, size, ...props }) => {
    const sizes = {
        small: "2rem",
        medium: "4rem",
        large: "6rem",
        xlarge: "8rem"
    }

    var styles = { width: sizes.medium, height: sizes.medium, objectFit: "cover" };
    if (props.style) styles = { ...styles, ...props.style };
    if (size) styles = { ...styles, width: sizes[size], height: sizes[size] };

    var classVar = [];
    classVar.push("rounded-circle border-2");
    if (user.popularity < 0.5) classVar.push("border-danger");
    else if (user.popularity < 0.75) classVar.push("border-warning");
    else if (user.popularity >= 0.75) classVar.push("border-success");
    else classVar.push("border-primary");

    if (props.noStatus) classVar.push("border-0");

    return <img src={user.profilePictureURI} alt={user.name} className={`rounded-circle ${classVar.join(" ")}`} style={styles} />
}

export const AlertMessage = ({ type, message, iconName, ...props }) => {
    const { confirmLabel, cancelLabel, onConfirm, onCancel } = props;
    const classVar = ["alert", "alert-dismissible", "fade", "show"];
    if (props.flush) classVar.push("rounded-0");

    classVar.push(`alert-${type}`);

    return <div className={classVar.join(" ")} role="alert">
        <div className="d-flex flex-row gap-2 align-items-center">
            {iconName && <i className={`${iconName}`}></i>}
            <p className="m-0">{message}</p>
        </div>
        {onCancel && <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onCancel}>{cancelLabel || "Cancelar"}</button>}
        {onConfirm && <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmLabel || "Confirmar"}</button>}
    </div>
}