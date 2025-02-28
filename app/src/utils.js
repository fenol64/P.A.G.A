import localforage from "localforage";
import Web3 from "web3";

export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const getWeb3Provider = async (magic) => {
    if (magic && (await localforage.getItem("type") === "magic")) {
        return new Web3(magic.rpcProvider);
    }

    if (await localforage.getItem("type") === "metamask") {
        return new Web3(window.ethereum);
    }

    return null;
}

export const getErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message;
    }

    return error.message;
};

export const extractNumbers = (string) => {
    return string.replace(/\D/g, "");
};

export const popularityToStars = (popularity) => {
    // 0 to 5 stars;
    // receive 0.3 stars -> return 2 star; 0.6 -> 3 stars; 0.9 -> 5 stars;
    return Math.ceil(popularity * 5);
};

export function imagePlaceholderURI(text = null) {
    return "https://placehold.co/128x128/333333/333333?text=" + encodeURIComponent(text ?? ".");
}

export function humanDate(date, withTime = false) {
    var dateString = "";
    const today = new Date();

    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (today.getFullYear() === year && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {
        dateString = "Hoje";
    } else if (today.getFullYear() === year && today.getMonth() === date.getMonth() && today.getDate() - 1 === date.getDate()) {
        dateString = "Ontem";
    } else {
        month = month.toString().padStart(2, 0);
        day = day.toString().padStart(2, 0);
        dateString = `${day}/${month}/${year}`;
    }

    if (withTime) {
        hours = hours.toString().padStart(2, 0);
        minutes = minutes.toString().padStart(2, 0);
        dateString += ` às ${hours}:${minutes}`;
    }

    return dateString;
}

export function humanDatePast(date) {
    date = new Date(date);
    const today = new Date();
    const diff = date - today;
    const diffSeconds = Math.floor(Math.abs(diff) / 1000);

    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    const isFuture = diff > 0;
    const prefix = isFuture ? "Em" : "Há";

    var result = [prefix];

    if (diffSeconds < 60) result.push(diffSeconds, diffSeconds === 1 ? "segundo" : "segundos");
    else if (diffMinutes < 60) result.push(diffMinutes, diffMinutes === 1 ? "minuto" : "minutos");
    else if (diffHours < 24) result.push(diffHours, diffHours === 1 ? "hora" : "horas");
    else if (diffDays < 7) result.push(diffDays, diffDays === 1 ? "dia" : "dias");
    else if (diffWeeks < 4) result.push(diffWeeks, diffWeeks === 1 ? "semana" : "semanas");
    else if (diffMonths < 12) result.push(diffMonths, diffMonths === 1 ? "mês" : "meses");
    else result.push(diffYears, diffYears === 1 ? "ano" : "anos");

    return result.join(" ");
}