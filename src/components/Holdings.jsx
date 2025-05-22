import React, { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  background-color: #171A26;
  color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 27px;
  padding: 16px;
  width: 92vw;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
`;

const TableHoldingAndAVGPRICE = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const SPAN = styled.span`
  font-size: 12px;
`;

const Table = styled.div`
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 40px 2fr 2fr 1.5fr 1.5fr 1.5fr 1.2fr;
  align-items: center;
  padding: 10px 18px;
  background-color: ${(props) => (props.selected ? '#1a1a1a' : 'transparent')};
  border-top: 1px solid #2a2a2a;

  &:hover {
    background-color: #1f1f1f;
  }
`;

const HEADINGRow = styled.div`
  display: grid;
  grid-template-columns: 40px 2fr 2fr 1.5fr 1.5fr 1.5fr 1.2fr;
  align-items: center;
  padding: 1px 16px;
  background-color: #141414;
  font-weight: bold;
  text-transform: uppercase;
  border-top: none;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CoinLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const TABLEHEADING = styled.div`
  font-size: 12px;
`;

const Footer = styled.div`
  padding: 10px 16px;
  text-align: left;
  color: #4e8cff;
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;


const Holdings = ({ holdings, selectedRows, toggleSelection, handleSelectAll }) => {
  const [showAll, setShowAll] = useState(false);

  const allSelected = holdings.length > 0 && holdings.every((_, i) => selectedRows[i]);
  const visibleHoldings = showAll ? holdings : holdings.slice(0, 6);

  return (
    <Container>
      <Title>Holdings</Title>
      <Table>
        <TABLEHEADING>
          <HEADINGRow>
            <div>
              <Checkbox
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
            <div>Asset</div>
            <TableHoldingAndAVGPRICE>
              <p>
                Holdings<br />
                <SPAN>Avg Buy Price</SPAN>
              </p>
            </TableHoldingAndAVGPRICE>
            <div>Current Price</div>
            <div>Short-Term Gain</div>
            <div>Long-Term Gain</div>
            <div>Amount to Sell</div>
          </HEADINGRow>
        </TABLEHEADING>

        {visibleHoldings.map((item, index) => (
          <Row key={item.coin} selected={!!selectedRows[index]}>
            <div>
              <Checkbox
                checked={!!selectedRows[index]}
                onChange={() => toggleSelection(index)}
              />
            </div>
            <CoinInfo>
              <CoinLogo src={item.logo} alt={item.coinName} />
              <span>{item.coinName} ({item.coin})</span>
            </CoinInfo>
            <div>
              {item.totalHolding}<br />
              <span style={{ color: '#aaa', fontSize: '12px' }}>
                Avg: ${item.averageBuyPrice.toLocaleString()}
              </span>
            </div>
            <div>${item.currentPrice.toLocaleString()}</div>
            <div>
              <span style={{ color: item.stcg.gain >= 0 ? '#0f0' : '#f00' }}>
                {item.stcg.gain.toFixed(4)}
              </span><br />
              <span style={{ fontSize: '12px', color: '#aaa' }}>
                ${item.stcg.balance.toLocaleString()}
              </span>
            </div>
            <div>
              <span style={{ color: item.ltcg.gain >= 0 ? '#0f0' : '#f00' }}>
                {item.ltcg.gain.toFixed(4)}
              </span><br />
              <span style={{ fontSize: '12px', color: '#aaa' }}>
                ${item.ltcg.balance.toLocaleString()}
              </span>
            </div>
            <div>
              {selectedRows[index] ? item.totalHolding : '-'}
            </div>
          </Row>
        ))}
      </Table>
      {holdings.length > 6 && (
        <Footer onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View less' : 'View all'}
        </Footer>
      )}
    </Container>
  );
};

export default Holdings;