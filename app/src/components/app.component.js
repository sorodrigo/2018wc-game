import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Ranking from './ranking.component';
import { Consumer } from '../state.context';
import { debounce } from 'lodash-es';

export const ResponsiveContext = React.createContext();

class AppComponent extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  theme = {
    color: {
      gray: '#F4F4F4',
      lightGray: '#f0f0f0',
      white: '#fff',
      charcoal: '#34444C',
      charcoalFaded: 'rgba(52, 68, 76, 0.6)'
    },
    size: { large: '66px', medium: '32px', small: '22px', xsmall: '16px' },
    breakpoint: { medium: '750px', large: '1280px' }
  };

  state = {
    mobile: window.innerWidth <= 750
  };

  handleResize = debounce(() => {
    if (window.innerWidth <= 750) {
      this.setState({ mobile: true });
    } else {
      this.setState({ mobile: false });
    }
  }, 300);

  render() {
    const { Provider: ResponsiveProvider } = ResponsiveContext;
    return (
      <ThemeProvider theme={this.theme}>
        <ResponsiveProvider value={this.state.mobile}>
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
        </ResponsiveProvider>
      </ThemeProvider>
    );
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.color.lightGray};
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - ${p => p.theme.size.small});
  overflow: hidden;
  height: calc(100% - ${p => p.theme.size.small});
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    width: calc(100% - ${p => p.theme.size.large});
    max-width: calc(${p => p.theme.breakpoint.large} - ${p => p.theme.size.small});
    height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
  background-color: ${p => p.theme.color.white};
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
  flex: 1;
`;

const Tabs = styled.nav`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: ${p => p.theme.size.xsmall} 0;
  flex-shrink: 0;
`;

const Tab = styled.button`
  padding: 8px 16px;
  background-color: ${p => p.active ? p.theme.color.gray : p.theme.color.white};
  border-radius: 2px;
  cursor: pointer;
  border: 0;
  min-height: 34px
  
  &:last-child {
    margin: 0 0 0 ${p => p.theme.size.xsmall};
  }
`;

const LastUpdated = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${p => p.theme.size.xsmall};
  width: 100%;
  margin: 16px 0 0;
  font-size: 12px;
  color: ${p => p.charcoalFaded};
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    height: ${p => p.theme.size.medium};
  }
`;
export default AppComponent;
