import React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash-es';

class RankingPlayer extends React.PureComponent {
  state = { visible: false };
  onMouseEnter = () => this.setState({ visible: true });
  onMouseLeave = () => this.setState({ visible: false });
  render() {
    const { playerName, position, results, onClick } = this.props;
    const resultEmojis = {
      0: '❌',
      1: '✅',
      3: '🏆'
    };
    const resultsString = results.map(result => resultEmojis[result]);
    const score = results.reduce((acc, next) => acc + next, 0);
    return (
      <Row
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
        data-clipboard={`${position}. ${startCase(playerName)} ${resultsString} ${score}`}
      >
        <Container>
          <Position>{position}.</Position>
          <Name>{startCase(playerName)}</Name>
          <Results>{resultsString}</Results>
          <CopyText visible={this.state.visible}>Copy to clipboard!</CopyText>
        </Container>
        <span>{score}</span>
      </Row>
    );
  }
}

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  width: 100%;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;
const Position = styled.span`
  color: rgba(52, 68, 76, 0.6);
  width: 30px;
`;
const Name = styled.span`
  color: #3444C;
  padding: 0 20px;
`;
const Results = styled.span`
`;
const CopyText = styled.div`
  margin: 0 0 0 20px;
  color: rgba(52, 68, 76, 0.6);
  visibility: ${props => props.visible ? 'visible' : 'hidden'}
  pointer-events: none;
`;
export default RankingPlayer;
