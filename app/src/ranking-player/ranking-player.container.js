import React from 'react';
import { Consumer } from '../state.context';
import RankingPlayer from './ranking-player.component';

export default class RankingPlayerContainer extends React.PureComponent {

  render() {
    const { playerName } = this.props;
    return (
      <Consumer>
        {({ players, games }) => {
          const playersData = players.data[playerName];
          const results = games.map((game) => playersData[game.gameId]);
          return (
            <RankingPlayer {...this.props} results={results} />
          )
        }}
      </Consumer>
    );
  }
}
