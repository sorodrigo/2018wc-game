import React from 'react';
import styled from 'styled-components';

function Knockouts(props) {
  const { knockouts } = props;
  return (
    <Container>

    </Container>
  );
}

const Container = styled.div`
  padding: 0 ${p => p.theme.size.xsmall};
  
  @media screen and (min-width: ${p => p.theme.breakpoint.medium}) {
    padding: 0 ${p => p.theme.size.medium};
  }
`;

export default Knockouts;
