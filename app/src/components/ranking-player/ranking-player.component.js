import React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash-es';
import EmojiResults from '../emoji-results.component';
import { ResponsiveContext } from '../app.component';

class RankingPlayer extends React.PureComponent {
  state = { visible: false };
  emojis = { 0: '❌', 1: '✅', 3: '🏆' };
  onMouseEnter = () => this.setState({ visible: true });
  onMouseLeave = () => this.setState({ visible: false });
  render() {
    const { Consumer: ResponsiveConsumer } = ResponsiveContext;
    const { playerName, position, results, onClick, mobile } = this.props;

    const resultsString = results.reduce((acc, res) => acc + this.emojis[res.points], '');
    const score = results.reduce((acc, next) => acc + next.points, 0);
    return (
      <ResponsiveConsumer>
        {(mobile) => (
          <Row
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={onClick}
            data-clipboard={`${resultsString} — ${score}`}
          >
            {console.log(mobile)}
            <Container>
              <Position>{position}.</Position>
              <Name>{startCase(playerName)}</Name>
              <EmojiResults results={results} emojis={this.emojis} />
              {mobile === false &&
                <CopyText visible={this.state.visible}>Copy to clipboard!</CopyText>
              }
            </Container>
            <Score>{score}</Score>
          </Row>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 ${p => p.theme.size.xsmall};
  height: 100px;
  margin: ${p => p.theme.size.xsmall} 0 0;
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    padding: 0 ${p => p.theme.size.medium};
    height: ${p => p.theme.size.medium};
    margin: 0;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  margin-right: 20px;
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    align-items: center;
  }
`;
const Position = styled.span`
  color: ${p => p.theme.color.charcoalFaded};
  width: 30px;
`;
const Name = styled.span`
  color: ${p => p.theme.color.charcoal};
  padding: 0 20px;
  min-width: 175px;
  display: flex;
  justify-content: flex-start;
`;
const Score = styled.span`
  color: ${p => p.theme.color.charcoal};
  height: 100%
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    height: auto;
  }
`;
const CopyText = styled.div`
  margin: 0 0 0 20px;
  color: ${p => p.theme.color.charcoalFaded};
  visibility: ${props => props.visible ? 'visible' : 'hidden'}
  pointer-events: none;
`;
export default RankingPlayer;