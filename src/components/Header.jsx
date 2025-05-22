import styled from 'styled-components';

const HeaderContainer = styled.div`
  background: #0d0d0d;
  padding: 1rem 2rem;
  margin: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  width: 95vw;
  overflow: hidden;
`;

export default function Header() {
  return (
    <HeaderContainer>
      Koin<span style={{ color: '#fbbf24' }}>X</span>
    </HeaderContainer>
  );
}