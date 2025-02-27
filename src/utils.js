export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
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
    const diff = today - date;
    const diffSeconds = diff / 1000;

    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;
    const diffWeeks = diffDays / 7;
    const diffMonths = diffDays / 30;
    const diffYears = diffDays / 365;

    if (diffSeconds < 60) return "Agora";
    else if (diffMinutes < 60) return `Há ${Math.floor(diffMinutes)} minutos`;
    else if (diffHours < 24) return `Há ${Math.floor(diffHours)} horas`;
    else if (diffDays < 7) return `Há ${Math.floor(diffDays)} dias`;
    else if (diffMonths < 1) return `Há ${Math.floor(diffWeeks)} semanas`;
    else if (diffYears < 1) return `Há ${Math.floor(diffMonths)} meses`;
    else return `Há ${Math.floor(diffYears)} anos`;
}