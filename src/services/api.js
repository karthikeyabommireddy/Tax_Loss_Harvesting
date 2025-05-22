export const fetchCapitalGains = async () => {
    const response = await fetch("https://682e4b1f746f8ca4a47c803b.mockapi.io/CapitalGains");
    return await response.json();
  };
  
  export const fetchHoldings = async () => {
    const response = await fetch("https://682e4b1f746f8ca4a47c803b.mockapi.io/holdings");
    return await response.json();
  };