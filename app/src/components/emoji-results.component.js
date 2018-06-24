import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { ResponsiveContext } from './app.component';

class EmojiResults extends React.PureComponent {

  renderEmojisList() {
    const { results, emojis } = this.props;
    return (
      <React.Fragment>
        {results.map(item => (
          <Popup
            key={item.fifa_id}
            trigger={<EmojiList status={item.status}>{emojis[item.points]}</EmojiList>}
            position="top center"
            on="hover"
          >
            <span>{item.homeFlag} {item.home} - {item.away} {item.awayFlag}</span>
          </Popup>
        ))}
      </React.Fragment>
    )
  }

  renderEmojisSummary() {
    const { results, emojis } = this.props;
    const summary = Object.entries(results.reduce(
      (acc, next) => ({ ...acc, [next.points]: (acc[next.points] || 0) + 1 }),
      {}
    ));
    return (
      <SummaryContainer>
        {summary.map(([points, times], i) => (
          <EmojiSummary key={points} status={results[i].status}>{emojis[points]}x{times}</EmojiSummary>
        ))}
      </SummaryContainer>
    );
  }

  render() {
    const { Consumer: ResponsiveConsumer } = ResponsiveContext;

    return (
      <ResponsiveConsumer>
        {(mobile) => mobile ? this.renderEmojisSummary() : this.renderEmojisList()}
      </ResponsiveConsumer>
    );
  }
}

const EmojiList = styled.span`
  opacity: ${p => p.status === 'in progress' ? 0.25 : 1};
`;
const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const EmojiSummary = styled.span`
  margin: 0 0 ${p => p.theme.size.xsmall};
  opacity: ${p => p.status === 'in progress' ? 0.25 : 1};
  
  &:last-child {
    margin: 0
  }
`;

export default EmojiResults;
