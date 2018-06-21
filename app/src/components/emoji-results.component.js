import React from 'react';
import styled from 'styled-components';
import { ResponsiveContext } from './app.component';

class EmojiResults extends React.PureComponent {

  renderEmojisList() {
    const { results, emojis } = this.props;
    return (
      <React.Fragment>
        {results.map(item => (
          <span
            key={item.gameId}
            title={`${item.result.home} - ${item.result.away}`}
          >
            {emojis[item.points]}
          </span>
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
        {summary.map(([points, times]) => (
          <EmojiSummary key={points}>{emojis[points]}x{times}</EmojiSummary>
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

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const EmojiSummary = styled.span`
  margin: 0 0 ${p => p.theme.size.xsmall};
  
  &:last-child {
    margin: 0
  }
`;

export default EmojiResults;
