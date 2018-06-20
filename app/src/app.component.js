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
            <Wrapper>
              <Content>
                <Tabs>
                  <Tab active>Ranking</Tab>
                  <Tab onClick={() => alert('coming soon!')}>Games</Tab>
                </Tabs>
                <Ranking list={players.list} />
              </Content>
              <LastUpdated>Last Updated: {lastUpdate}</LastUpdated>
            </Wrapper>
          )}
        </Consumer>
      </Container>
    );
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 22px);
  overflow: hidden;
  
  @media screen and (min-width: 730px) {
    width: calc(100% - 66px);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
`;

const Tabs = styled.nav`
  display: flex;
  align-items: baseline;
  justify-content: center;
  background-color: white;
  padding: 16px 0;
`;

const Tab = styled.button`
  padding: 8px 16px;
  background-color: ${p => p.active ? '#F4F4F4' : 'white'};
  border-radius: 2px;
  cursor: pointer;
  border: 0;
  &:last-child {
    margin: 0 0 0 16px;
  }
`;

const LastUpdated = styled.p`
  text-align: right;
  font-size: 12px;
  color: rgba(52, 68, 76, 0.6);
  margin: 16px 0 0;
  width: 100%;
`;
export default AppComponent;
