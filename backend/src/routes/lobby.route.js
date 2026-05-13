import {
    createLobby, getActiveLobbies, leaveLobby, endMatch, startMatch, kickPlayer
} from "../controllers/lobby.controller.js";
import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getActiveLobbies);
router.route("/create").post(verifyJWT, createLobby);
router.route("/leave/:lobbyId").post(verifyJWT, leaveLobby);
router.route("/end-match").post(verifyJWT, endMatch);
router.route("/start-match/:lobbyId").patch(verifyJWT, startMatch);
router.route("/kick").patch(verifyJWT, kickPlayer);

export default router;