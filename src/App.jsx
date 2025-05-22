import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CapitalGains from './components/CapitalGains';
import Holdings from './components/Holdings';
import { fetchHoldings, fetchCapitalGains } from './services/api';
import Header from './components/Header';

const AppContainer = styled.div`
  background-color: black;
  min-height: 100vh;
  padding: 0px 20px 10px 0px;
  font-family: 'Segoe UI', sans-serif;
`;

function App() {
  const [holdings, setHoldings] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [preGains, setPreGains] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, capitalGainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);

        setHoldings(holdingsData);
        const apiGains = capitalGainsData[0]; // assuming it's an array with one object
        setPreGains({
          stProfit: apiGains.stcg_profits,
          stLoss: -apiGains.stcg_losses, // losses stored as positive in API, convert to negative
          ltProfit: apiGains.ltcg_profits,
          ltLoss: -apiGains.ltcg_losses,
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const toggleSelection = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const all = {};
      holdings.forEach((_, i) => {
        all[i] = true;
      });
      setSelectedRows(all);
    } else {
      setSelectedRows({});
    }
  };

  const selectedHoldings = holdings.filter((_, i) => selectedRows[i]);

  const calculatePostGains = () => {
    if (!preGains) return null;

    let post = {
      stProfit: preGains.stProfit,
      stLoss: preGains.stLoss,
      ltProfit: preGains.ltProfit,
      ltLoss: preGains.ltLoss,
    };

    selectedHoldings.forEach(({ stcg, ltcg }) => {
      if (stcg.gain < 0) post.stLoss += stcg.gain;
      if (stcg.gain > 0) post.stProfit += stcg.gain;

      if (ltcg.gain < 0) post.ltLoss += ltcg.gain;
      if (ltcg.gain > 0) post.ltProfit += ltcg.gain;
    });

    return post;
  };

  const postGains = calculatePostGains();

  return (
    <AppContainer>
      <Header/>
      {preGains && postGains && (
        <CapitalGains pre={preGains} post={postGains} />
      )}
      <Holdings
        holdings={holdings}
        selectedRows={selectedRows}
        toggleSelection={toggleSelection}
        handleSelectAll={handleSelectAll}
      />
    </AppContainer>
  );
}

export default App;
