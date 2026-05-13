/**
 * Logic to calculate XP and identify potential smurf behavior
 * @param {number} kills
 * @param {number} deaths
 * @param {boolean} isWin
 */

export const calculateNexusXP = (kills, deaths, isWin) => {
  const BASE_XP = 100;
  const WIN_BONUS = isWin ? 50 : 0;

  const kdRatio = kills / (deaths || 1);

  let multiplier = 1.0;
  if (kdRatio >= 2.5) {
    multiplier = 2.0;
  } else if (kdRatio >= 4.0) {
    multiplier = 3.5;
  }

  const totalXP = Math.floor((BASE_XP + WIN_BONUS) * multiplier);

  return {
    totalXP,
    isSuspectedSmurf: kdRatio >= 4.0,
  };
};
