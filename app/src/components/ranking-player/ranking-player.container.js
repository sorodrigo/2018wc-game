import React from 'react';
import { Consumer } from '../state.component';
import RankingPlayer from './ranking-player.component';

export default class RankingPlayerContainer extends React.PureComponent {

  render() {
    const { playerName } = this.props;
    return (
      <Consumer>
        {({ players, groupStage, countries }) => {
          const plays = players.data[playerName];
          const results = groupStage.list.filter(fifa_id => groupStage.data[fifa_id].status !== 'future')
            .map((fifa_id) => {
              const game = groupStage.data[fifa_id];
              const play = plays[fifa_id];
              const { home_team, away_team, status } = game;
              const homeFlag = countries[home_team.code].emoji;
              const awayFlag = countries[away_team.code].emoji;
              return { ...play, status, homeFlag, awayFlag, fifa_id }
          });
          return (
            <RankingPlayer {...this.props} results={results} />
          )
        }}
      </Consumer>
    );
  }
}
