import mongoose, {Schema} from "mongoose";
import {
  SUPPORTED_GAMES,
  REGIONS,
  MAX_PLAYERS,
  LOBBY_STATUS,
} from "../utils/constants.js";

const lobbySchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: String,
      required: true,
      enum: SUPPORTED_GAMES,
    },
    title: {
      type: String,
      required: [true, "Lobby title is required"],
      trim: true,
      maxlength: [50, "Lobby Title can't be more than 50 charecters"],
    },
    description: {
      type: String,
    },
    region: {
      type: String,
      required: true,
      enum: REGIONS,
    },
    maxPlayers: {
      type: Number,
      required: true,
      enum: Object.values(MAX_PLAYERS),
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rankRequirement: {
      type: String,
      default: "Any",
    },
    minNexusLevel: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(LOBBY_STATUS),
      default: LOBBY_STATUS.WAITING,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true},
);

lobbySchema.index({game: 1, region: 1});

export const Lobby = mongoose.model("Lobby", lobbySchema);
