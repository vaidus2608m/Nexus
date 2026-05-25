import { Router } from "express";
import { SUPPORTED_GAMES, REGIONS } from "../utils/constants.js";

const router = Router();

router.get("/constants", (req, res) => {
  res.status(200).json({
    success: true,
    data: { SUPPORTED_GAMES, REGIONS }
  });
});

export default router;