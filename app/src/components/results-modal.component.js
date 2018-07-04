import React from 'react';
import styled, { withTheme } from 'styled-components';
import ReactDOM from 'react-dom';

class ResultsModal extends React.PureComponent {
  root = document.getElementById('modal');
  el =  document.createElement('div');
  componentDidMount () {
    this.root.appendChild(this.el)
  }
  componentWillUnmount () {
    this.root.removeChild(this.el)
  }
  copyToClipboard(e) {
    const text = e.currentTarget.dataset.clipboard;
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  render() {
    const { results, emojis, open, close } = this.props;
    const resultsString = results.reduce((acc, item) => acc + emojis[item.points], '');
    const content = (
      <ModalOverlay onClick={close}>
        <ModalBox>
          <Container>
            <Header>
              <Button onClick={close}>Close</Button>
            </Header>
            <Content>
              {results.map(item => (
                <Item key={item.fifa_id}>{item.homeFlag} {item.home} — {item.away} {item.awayFlag} {emojis[item.points]}</Item>
              ))}
            </Content>
            <Footer>
              <Button
                onClick={this.copyToClipboard}
                data-clipboard={resultsString}
              >
                Copy to clipboard
              </Button>
            </Footer>
          </Container>
        </ModalBox>
      </ModalOverlay>
    );
    return open ? ReactDOM.createPortal(content, this.el) : null;
  }
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    z-index: 999;
`;

const ModalBox = styled.div`
    position: relative;
    background: rgb(255, 255, 255);
    width: auto;
    margin: 16px;
    padding: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,.15);
    
    @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
      width: 50%;
      margin: 16px auto;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 ${p => p.theme.size.xsmall};
  padding: 8px 0;
`;

const Button = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  font-size: 12px;
  cursor: pointer;

  &:active {
    color: ${p => p.theme.color.charcoalFaded}
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 8px 0 0 0;
  -webkit-overflow-scrolling: touch;
`;

const Item = styled.div`
  margin: 0 0 ${p => p.theme.size.xsmall} 0;
  &:nth-child(odd) {
    margin: 0 ${p => p.theme.size.xsmall} ${p => p.theme.size.xsmall} 0;
  }
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    margin: 0 ${p => p.theme.size.xsmall} ${p => p.theme.size.xsmall} 0;  
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  padding: 8px 0;
`;

export default withTheme(ResultsModal);
