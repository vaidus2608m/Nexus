import {Lobby} from "../models/lobby.model.js";
import { User } from "../models/user.model.js"
import {LOBBY_STATUS} from "../utils/constants.js";
import {asyncHandler} from "../utils/async-handler.js";
import {APIError} from "../utils/api-error.js";
import {APIResponse} from "../utils/api-response.js";
import {calculateNexusXP} from "../utils/xp-engine.js";

const createLobby = asyncHandler(async (req, res) => {
  const {title, game, description, maxPlayers, minNexusLevel, region} =
    req.body;

  if (!title || !game) {
    throw new APIError(400, "Title and Game are mandatory");
  }

  if (req.user.nexusLevel < (minNexusLevel || 1)) {
    throw new APIError(400, "Level Requirements Don't Match");
  }

  const lobby = await Lobby.create({
    title,
    description: description || "",
    game: game,
    region: region || "Global",
    host: req.user._id,
    players: [req.user._id],
    maxPlayers: maxPlayers || 5,
    minNexusLevel: minNexusLevel || 1,
  });

  return res.status(201).json(new APIResponse(201, lobby, "Lobby Created"));
});

const getActiveLobbies = asyncHandler(async (req, res) => {
  const {game, region} = req.query;

  const filter = {status: LOBBY_STATUS.WAITING};

  if (game) filter.game = game;
  if (region) filter.region = region;

  const lobbies = await Lobby.find(filter)
    .populate("host", "username avatar nexusLevel")
    .sort({createdAt: -1});

  return res
    .status(200)
    .json(new APIResponse(200, lobbies, "Active lobbies fetched successfully"));
});

const leaveLobby = asyncHandler(async (req, res) => {
  const {lobbyId} = req.params;
  const lobby = await Lobby.findById(lobbyId);

  if (!lobby) throw new APIError(404, "Lobby not found");

  if (lobby.host.toString() === req.user._id.toString()) {
    lobby.status = LOBBY_STATUS.CANCELLED;
    await lobby.save();
    return res
      .status(200)
      .json(new APIResponse(200, {}, "Lobby Canclled By Host"));
  }

  const updatedLobby = await Lobby.findByIdAndUpdate(
    lobbyId,
    {$pull: {players: req.user._id}},
    {new: true},
  ).populate("players", "username nexusLevel");

  return res.status(200).json(new APIResponse(200, updatedLobby, "Left lobby"));
});

const endMatch = asyncHandler(async (req, res) => {
  const {lobbyId, matchResult} = req.body;

  const lobby = await Lobby.findById(lobbyId);
  if (lobby.host.toString() !== req.user._id.toString()) {
    throw new APIError(403, "Only the host can end the match");
  }

  const updatePromises = matchResult.map(async (res) => {
    const {totalXP, isSuspectSmurf} = calculateNexusXP(
      res.kills,
      res.deaths,
      res.isWin,
    );

    return User.findByIdAndUpdate(res.userId, {
      $inc: {nexusXP: totalXP},
      $set: {isFlagged: isSuspectSmurf},
    });
  });

  await Promise.all(updatePromises);

  lobby.status = LOBBY_STATUS.COMPLETED;
  await lobby.save();

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Match settled and XP rewarded"));
});

const startMatch = asyncHandler(async (req, res) => {
  const {lobbyId} = req.params;

  const lobby = await Lobby.findById(lobbyId);

  if(lobby.host.toString() !== req.user._id.toString()){
    throw new APIError(403, "Only the host can start the match");
  }

  lobby.status = LOBBY_STATUS.PLAYING;
  await lobby.save();

  return res.status(200).json(new APIResponse(200, lobby, "Match started! Lobby is now locked."))
})


const kickPlayer = asyncHandler(async (req, res) => {
  const {lobbyId, playerIdToKick} = req.body;

  const lobby = await Lobby.findById(lobbyId);

  if(lobby.host.toString() != req.user._id.toString()){
    throw new APIError(403, "Only the host can kick the player");
  }

  const updatedLobby = await Lobby.findByIdAndUpdate(
    lobbyId,
    { $pull: {players: playerIdToKick} },
    { new: true }
  ).populate("players", "username");

  return res.status(200).json(new APIResponse(200, updatedLobby, "Player is kicked"))
})

const joinLobby = asyncHandler(async (req, res) => {
  const {lobbyId} = req.params;
  const userId = req.user?._id;

  if(!userId){
    throw new APIError(403, "Authentication required to join a lobby");
  }

  const lobby = await Lobby.findById(lobbyId);
  if(!lobby){
    throw new APIError(404, "Lobby Not Found");
  }

  const activeLobbyStatuses = [LOBBY_STATUS.WAITING, LOBBY_STATUS.PLAYING];
  
  const alreadyInALobby = await Lobby.findOne({
    status: { $in: activeLobbyStatuses },
    players: userId
  });

  if (alreadyInALobby) {
    throw new APIError(
      400, 
      `You are already in an active lobby: "${alreadyInALobby.title}". Leave that lobby first!`
    );
  }

  if(lobby.players.length >= lobby.maxPlayers){
    throw new APIError(403, "Lobby is already full");
  }

  const currentMembers = lobby.players.map((id) => id.toString());
  if (currentMembers.includes(userId.toString())) {
    throw new APIError(403, "You are already a member of this lobby");
  }

  if(req.user.nexusLevel < lobby.minNexusLevel){
    throw new APIError(403, `Your level is ${req.user.nexusLevel}, Lobby requires min level of ${lobby.levelReq}`);
  }

  lobby.players.push(userId);
  await lobby.save();

  return res.status(200).json(new APIResponse(200, lobby, "Successfull joined nexus lobby"))
})

export {createLobby, getActiveLobbies, leaveLobby, endMatch, startMatch, kickPlayer, joinLobby};
