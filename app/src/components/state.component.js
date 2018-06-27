import React from 'react';
import countriesData from '../countries';
import playersData from '../players';
import { version } from '../../package.json';

const Context = React.createContext();

class State extends React.PureComponent {
  static getWinner(home, away) {
    if (home > away) return 'HOME';
    if (away > home) return 'AWAY';
    if (home === away) return 'DRAW';
  }

  getPoints(game, prediction) {
    if (typeof game === 'undefined') return;
    const { home_team, away_team } = game;
    let points = 0;
    if (State.getWinner(prediction.home, prediction.away) === State.getWinner(home_team.goals, away_team.goals)) {
      points = 1;
      if (home_team.goals === prediction.home && away_team.goals === prediction.away) {
        points += 2;
      }
    }
    return points;
  };

  addPoints = games => (players, [name, data]) => {
    return {
      ...players,
      [name]: Object.entries(data)
        .filter(([fifa_id]) => games[fifa_id].status !== 'future')
        .reduce((acc, [fifa_id, result]) => ({
          ...acc,
          [fifa_id]: { ...result, points: this.getPoints(games[fifa_id], result) }
        }), {})
    };
  };

  rankPlayers = data => (playerA, playerB) => {
    const getAllPoints = p => Object.values(data[p]).reduce((a, b) =>
        (typeof b.points !== 'undefined' ? a + b.points : a),
      0
    );
    const aPoints = getAllPoints(playerA);
    const bPoints = getAllPoints(playerB);
    if (aPoints < bPoints) return 1;
    if (aPoints > bPoints) return -1;
    return 0;
  };

  componentDidMount() {
    fetch('https://worldcup.sfg.io/matches')
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(json => {
        const list = json.map(row => row.fifa_id);
        const data = json.reduce((acc, next) => ({ ...acc, [next.fifa_id]: next }), {});
        return this.setPlayersState({ list, data });
      })
      .catch(err => console.error(err));
  }

  setPlayersState(games) {
    const data = Object.entries(playersData).reduce(this.addPoints(games.data), {});
    const players = {
      data,
      list: Object.keys(data).sort(this.rankPlayers(data))
    };
    this.setState({ games, players });
  }

  state = {
    version,
    games: {},
    players: {
      list: [],
      data: []
    },
    countries: countriesData,
    lastUpdate: new Date().toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit'})
  };

  render() {
    const { Provider } = Context;
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
export default State;
