import React from 'react';
import playersData from './players';
import gamesData from './games';

const getPoints = (game, prediction) => {
  let points = 0;
  if (game.value === prediction.value) {
    points = 1;
    if (game.home === prediction.home && game.away === prediction.away) {
      points += 2;
    }
  }
  return points;
};

const addPoints = (acc, [name, data]) => {
  return {
    ...acc,
    [name]: data.map((row, index) => {
      const game = games[index];
      return game ? { ...row, points: getPoints(game.result, row.result) } : row;
    })
  };
};


const rankPlayers = (playerA, playerB) => {
  const getAllPoints = p => rankingData[p].reduce((a, b) =>
    console.log(b) || (typeof b.points !== 'undefined' ? a + b.points : a),
    0
  );
  const aPoints = getAllPoints(playerA);
  const bPoints = getAllPoints(playerB);
  if (aPoints < bPoints) return 1;
  if (aPoints > bPoints) return -1;
  return 0;
};

const games = gamesData.filter(game => game.result !== null);
const rankingData = Object.entries(playersData).reduce(addPoints, {});

const state = {
  games,
  players: {
    list: Object.keys(rankingData).sort(rankPlayers),
    data: rankingData
  }
};
console.log(state);
const Context = React.createContext(state);

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
