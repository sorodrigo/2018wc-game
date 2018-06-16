import React from 'react';
import styled from 'styled-components';
import RankingPlayer from './ranking-player/ranking-player.container';

class Ranking extends React.PureComponent {
  onClickPlayer(e) {
    const text = e.currentTarget.dataset.clipboard;
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  render() {
    const { list } = this.props;
    return (
      <RankingContainer>
        {list.map((player, index) => (
          <RankingPlayer
            key={player}
            playerName={player}
            position={index}
            onClick={this.onClickPlayer}
          />
        ))}
      </RankingContainer>
    );
  }
}

const RankingContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export default Ranking;
