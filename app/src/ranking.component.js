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
            position={index + 1}
            onClick={this.onClickPlayer}
          />
        ))}
      </RankingContainer>
    );
  }
}

const RankingContainer = styled.ul`
  width: 100%;
  padding: 0 0 22px;
  margin: 0;
  background-color: white;
  list-style: none;
  
  @media screen and (min-width: 730px) {
    padding: 0 0 32px;
  }
`;

export default Ranking;
