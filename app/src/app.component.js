import React from 'react';
import styled from 'styled-components';
import Ranking from './ranking.component';
import { Consumer } from './state.context';

class AppComponent extends React.Component {
  render() {
    return (
      <Container>
        <Consumer>
          {({ players }) => (<Ranking list={players.list} />)}
        </Consumer>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
`;

export default AppComponent;
