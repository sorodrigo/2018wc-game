import React from 'react';
import styled from 'styled-components';
import RankingPlayer from './ranking-player/ranking-player.container';

function Ranking(props) {
  const { list } = props;
  return (
    <RankingContainer>
      {list.map((player, index) => (
        <RankingPlayer
          key={player}
          playerName={player}
          position={index + 1}
        />
      ))}
    </RankingContainer>
  );
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
