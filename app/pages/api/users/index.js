import { md5 } from "locutus/php/strings";
import { imagePlaceholderURI } from "root/src/utils";

/*
enum UserRole {
    POLITICIAN,
    VOTER,
    MODERATOR
}

struct User {
    uint256 id;
    string profilePictureURI;
    string politicalParty;
    string name;
    string politicianRole; // deputado, prefeito, vereador, etc
    UserRole role; // politician, voter, moderator
    string createdAt;
    string updatedAt;
}
*/


const userIDHash = (id) => {
    // hash function to generate a unique hash for a given user id
    // address: 0x787FEbA7CA34D18A4cC6169bBae551ADd5F78703
    var hash;
    hash = md5(id);
    hash = "0x0000" + hash;

    return hash;
};

const getUsersObject = () => {
    const usersObject = {};

    usersObject[userIDHash(1)] = {
        profilePictureURI: imagePlaceholderURI(),
        party: "Partido A",
        name: "João da Silva",
        politicianRole: "Deputado Federal",
        popularity: 0.8,
        role: "politician",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z"
    };
    usersObject[userIDHash(2)] = {
        profilePictureURI: imagePlaceholderURI(),
        party: "Partido C",
        name: "Maria da Silva",
        politicianRole: "Vereadora",
        popularity: 0.6,
        role: "politician",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z"
    };
    usersObject[userIDHash(3)] = {
        profilePictureURI: imagePlaceholderURI(),
        party: "Partido C",
        name: "José da Silva",
        politicianRole: "Prefeito",
        popularity: 0.2,
        role: "politician",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z"
    };

    return usersObject;
};

export default function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    try {
        const usersObject = getUsersObject();
        const users = Object.keys(usersObject).map(key => { usersObject[key].id = key; return usersObject[key] });

        if (method === "GET") {
            var total = 0;
            var usersList = users;

            if (id) {
                const user = users.find(user => user.id === id);

                if (user) return res.status(200).json(user);
                else return res.status(404).json({ message: "User not found" });
            }

            if (query.sortBy) {
                const sortBy = query.sortBy;
                if (sortBy === "popularity") usersList = usersList.sort((a, b) => a.popularity - b.popularity);
                else if (sortBy === "createdAt") usersList = usersList.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
            } else {
                usersList = usersList.sort((a, b) => a.name.localeCompare(b.name));
            }

            if (query.politicianRole) {
                const politicianRole = query.politicianRole;
                usersList = usersList.filter(user => user.politicianRole === politicianRole);
            }

            if (query.party) {
                const party = query.party;
                usersList = usersList.filter(user => user.party === party);
            }

            total = usersList.length;

            return res.status(200).json({
                total,
                users: usersList
            });
        }

        if (method === "POST") {
            const { profilePictureURI, party, name, politicianRole, role } = req.body;

            if (!profilePictureURI || !party || !name || !role) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const userData = {
                profilePictureURI,
                party,
                name,
                politicianRole,
                role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            usersObject[userIDHash(4)] = userData;
            const user = { id: userIDHash(4), ...userData };

            return res.status(201).json(user);
        }

        throw new CustomError("Method not allowed", 405);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}