import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const Wrapper = styled.div`
  width: 95vw;
  margin: 20px;
  background-color: black;
  color: white;
  box-sizing: border-box;
  padding: 14px;
  position: relative;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;

const TooltipWrapper = styled.span`
  position: relative;
  display: inline-block;
`;

const Link = styled.span`
  color: #60a5fa;
  font-size: 14px;
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TooltipBox = styled.div`
  position: absolute;
  top: 24px;
  left: 0;
  width: 280px;
  background-color: white;
  color: black;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 999;
  white-space: normal;
  animation: ${fadeIn} 0.2s ease-in-out;

  & ul {
    padding-left: 18px;
    margin: 0;
  }

  & li {
    margin-bottom: 6px;
  }

  & b {
    font-weight: bold;
  }
`;

const DisclaimerContainer = styled.div`
  background-color: #121D3A;
  border: 1px solid #374151;
  padding: 10px 16px;
  border-radius: 8px;
  margin: 16px 0;
`;

const DisclaimerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DisclaimerTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  color: white;
`;

const DisclaimerContent = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #FFFFFF;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #171A26;
  color: white;
  padding: 20px 24px 14px 24px;
  border-radius: 12px;
`;

const Card2 = styled.div`
  flex: 1;
  min-width: 300px;
  background: linear-gradient(#3C9AFF, #0066FE);
  color: white;
  padding: 20px 24px 14px 24px;
  border-radius: 12px;
`;

const SubHeading = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: 'arial';
  color: ${({ blue }) => (blue ? 'white' : '#e5e7eb')};
`;

const RowSP = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  gap: 30px;
  font-size: 18px;
  font-weight: 600;
`;

const Highlight = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
  color: ${({ blue }) => (blue ? 'white' : 'white')};
`;

const SPDIV = styled.div`
  min-width: 200px;
  margin: 6px 0;
  font-size: 20px;
  font-weight: 600;
`;

const DIVNORM = styled.div``;

const SPAN = styled.span`
  font-size: 26px;
  font-weight: 900;
  margin-left: 24px;
  font-family: 'arial';
`;

const SaveNote = styled.div`
  margin-top: 8px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 8px 10px;
  border-radius: 6px;
`;

function CapitalGains({ pre, post }) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleDisclaimer = () => setShowDisclaimer(!showDisclaimer);

  const format = (value) => `$${value.toLocaleString()}`;
  const getNet = (profit, loss) => profit + loss;
  const getTotal = (obj) => getNet(obj.stProfit, obj.stLoss) + getNet(obj.ltProfit, obj.ltLoss);

  const preRealised = getTotal(pre);
  const postRealised = getTotal(post);
  const savings = preRealised - postRealised;

  const renderCard = (label, data, isAfter) => (
    <div style={{ flex: 1 }}>
      {isAfter ? (
        <Card2>
          <SubHeading blue>{label}</SubHeading>
          <RowSP>
            <SPDIV></SPDIV>
            <DIVNORM>Short-term</DIVNORM>
            <DIVNORM>Long-term</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Profits</SPDIV>
            <DIVNORM>{format(data.stProfit)}</DIVNORM>
            <DIVNORM>{format(data.ltProfit)}</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Losses</SPDIV>
            <DIVNORM>{format(Math.abs(data.stLoss))}</DIVNORM>
            <DIVNORM>{format(Math.abs(data.ltLoss))}</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Net Capital Gains</SPDIV>
            <DIVNORM>{format(getNet(data.stProfit, data.stLoss))}</DIVNORM>
            <DIVNORM>{format(getNet(data.ltProfit, data.ltLoss))}</DIVNORM>
          </RowSP>
          <Highlight blue>
            Realised Capital Gains:
            <SPAN>{format(postRealised)}</SPAN>
          </Highlight>
          {savings > 0 && (
            <SaveNote>
              🎉 You're going to save up to ${savings.toLocaleString()}
            </SaveNote>
          )}
        </Card2>
      ) : (
        <Card>
          <SubHeading>{label}</SubHeading>
          <RowSP>
            <SPDIV></SPDIV>
            <DIVNORM>Short-term</DIVNORM>
            <DIVNORM>Long-term</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Profits</SPDIV>
            <DIVNORM>{format(data.stProfit)}</DIVNORM>
            <DIVNORM>{format(data.ltProfit)}</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Losses</SPDIV>
            <DIVNORM>{format(Math.abs(data.stLoss))}</DIVNORM>
            <DIVNORM>{format(Math.abs(data.ltLoss))}</DIVNORM>
          </RowSP>
          <RowSP>
            <SPDIV>Net Capital Gains</SPDIV>
            <DIVNORM>{format(getNet(data.stProfit, data.stLoss))}</DIVNORM>
            <DIVNORM>{format(getNet(data.ltProfit, data.ltLoss))}</DIVNORM>
          </RowSP>
          <Highlight>
            Realised Capital Gains:
            <SPAN>{format(preRealised)}</SPAN>
          </Highlight>
        </Card>
      )}
    </div>
  );

  return (
    <Wrapper>
      <Header>
        Tax Optimisation
        <TooltipWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Link>How it works?</Link>
          {showTooltip && (
            <TooltipBox>
              <ul>
                <li>See your capital gains for FY 2024-25 in the left card</li>
                <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                <li>Instantly see your updated tax liability in the right card</li>
              </ul>
              <b>Pro tip:</b> Experiment with different combinations of your holdings to optimize your tax liability
            </TooltipBox>
          )}
        </TooltipWrapper>
      </Header>

      <DisclaimerContainer>
        <DisclaimerHeader onClick={toggleDisclaimer}>
          <DisclaimerTitle>
            <Info size={18} style={{ marginRight: 8 }} color='#6290FF' />
            Important Notes & Disclaimers
          </DisclaimerTitle>
          {showDisclaimer ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </DisclaimerHeader>

        {showDisclaimer && (
          <DisclaimerContent>
            <ul>
              <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
              <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
              <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
              <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
              <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
            </ul>
          </DisclaimerContent>
        )}
      </DisclaimerContainer>

      <Grid>
        {renderCard('Pre Harvesting', pre, false)}
        {renderCard('After Harvesting', post, true)}
      </Grid>
    </Wrapper>
  );
}

export default CapitalGains;