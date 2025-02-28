export default class CommitmentController {
    constructor() {
        return this;
    }

    async init() {
        return this;
    }

    async applyVote(commitmentId, vote) {
        console.log("Vote applied to commitment", commitmentId, vote);
        return true;
    }
}