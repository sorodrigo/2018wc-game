import React from 'react';
import styled, { withTheme } from 'styled-components';
import PopUp from 'reactjs-popup';

class ResultsModal extends React.PureComponent {
  modalStyle = {
    mobile: {
      width: 'auto',
      margin: this.props.theme.size.xsmall
    },
    desktop: {
      margin: `${this.props.theme.size.xsmall} auto`
    }
  };

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
    const { children, results, emojis, mobile } = this.props;
    const resultsString = results.reduce((acc, item) => acc + emojis[item.points], '');
    const styles = mobile ? this.modalStyle.mobile : this.modalStyle.desktop;
    return (
      <PopUp
        modal
        lockScroll
        closeOnDocumentClick
        contentStyle={styles}
        trigger={children}
      >
        {close => (
          <Container>
            <Header>
              <Button onClick={close}>Close</Button>
            </Header>
            <Content>
              {results.map(item => (
                <Item>{item.homeFlag} {item.home} — {item.away} {item.awayFlag} {emojis[item.points]}</Item>
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
        )}
      </PopUp>
    );
  }
}

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
