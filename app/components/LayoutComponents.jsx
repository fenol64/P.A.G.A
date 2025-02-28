import Head from "next/head";
import { humanDate } from "root/src/utils";

export function Button({ label, className, children, ...props }) {
    var { border, color, rounded, size, iconName, modal } = props;
    const classVar = [];

    classVar.push("d-inline-flex", "flex-row", "align-items-center", "justify-content-center", "fw-bold", "text-uppercase");

    // defaults
    size = size ?? "md";
    border = border ?? 0;
    rounded = (rounded !== undefined && rounded !== null) ? rounded : 3;
    color = color ? color : "secondary";

    classVar.push("btn");
    classVar.push(`btn-${size}`);
    classVar.push(`btn-${color}`);
    classVar.push(`rounded-${rounded}`);
    classVar.push(`border-${border}`);

    if (className) classVar.push(className);

    if (modal) {
        props["data-bs-toggle"] = "modal";
        props["data-bs-target"] = modal;
    }

    return <button type="button" className={classVar.join(" ")} {...props}>
        {iconName && <i className={`${iconName}`}></i>}
        {label && <span>{label}</span>}
        {children}
    </button>
}

export function Navbar({ pageTitle, currentPage, backLink }) {
    return <header className="navbar navbar-dark bg-black p-0 border-bottom border-dark sticky-top">
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
    return;
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