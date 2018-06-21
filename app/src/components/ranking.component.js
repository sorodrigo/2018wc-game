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
  padding: 0 0 ${p => p.theme.size.small};
  margin: 0;
  list-style: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    padding: 0 0 ${p => p.theme.size.medium};
  }
`;

export default Ranking;