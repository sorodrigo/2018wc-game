import React from 'react';
import styled from 'styled-components';

function EmojiResults(props) {
  const { results, emojis } = props;
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

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    flex-direction: row;
  }
`;
const EmojiSummary = styled.span`
  margin: 0 0 ${p => p.theme.size.xsmall};
  opacity: ${p => p.status === 'in progress' ? 0.25 : 1};
  
  &:last-child {
    margin: 0
  }
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    margin: 0 ${p => p.theme.size.xsmall} 0 0;
  }
`;

export default EmojiResults;
