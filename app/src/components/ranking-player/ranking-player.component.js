import React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash-es';
import EmojiResults from '../emoji-results.component';
import { ResponsiveContext } from '../app.component';
import Modal from '../results-modal.component';

class RankingPlayer extends React.PureComponent {
  state = { visible: false, modalOpen: false };
  emojis = { 0: '❌', 1: '✅', 3: '🏆' };
  onMouseEnter = () => this.setState({ visible: true });
  onMouseLeave = () => this.setState({ visible: false });
  openModal = () => this.setState({ modalOpen: true });
  closeModal = () => this.setState({ modalOpen: false });
  render() {
    const { Consumer: ResponsiveConsumer } = ResponsiveContext;
    const { playerName, position, results } = this.props;

    const score = results.reduce((acc, next) => acc + next.points, 0);
    return (
      <ResponsiveConsumer>
        {(mobile) => (
          <React.Fragment>
            <Modal
              open={this.state.modalOpen}
              results={results}
              emojis={this.emojis}
              mobile={mobile}
              close={this.closeModal}
            />
              <Row
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.openModal}
              >
                <Container>
                  <Position>{position}.</Position>
                  <Name>{startCase(playerName)}</Name>
                  <EmojiResults results={results} emojis={this.emojis} />
                  {mobile === false &&
                  <CopyText visible={this.state.visible}>
                    Check results!
                  </CopyText>
                  }
                </Container>
                <Score>{score}</Score>
              </Row>
          </React.Fragment>
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
  border-bottom: 1px solid ${p => p.theme.color.lightGray};
  
  &:last-child {
    border: 0;
  }
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    padding: 0 ${p => p.theme.size.medium};
    height: ${p => p.theme.size.medium};
    margin: 0;
    border: 0;
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
