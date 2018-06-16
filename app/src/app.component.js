import React from 'react';
import styled from 'styled-components';
import Ranking from './ranking.component';
import { Consumer } from './state.context';

class AppComponent extends React.Component {
  render() {
    return (
      <Container>
        <Consumer>
          {({ players, lastUpdate }) => (
            <Content>
              <Ranking list={players.list} />
              <LastUpdated>Last Updated: {lastUpdate}</LastUpdated>
            </Content>
          )}
        </Consumer>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
  margin: 66px
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
`;

const LastUpdated = styled.span`
  text-align: right;
  font-size: 12px;
  color: rgba(52, 68, 76, 0.6);
`;
export default AppComponent;
