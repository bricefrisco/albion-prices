const ALBION_API_BASE_URL = "https://west.albion-online-data.com/api/v2";

const CITY_MAPPING = {
  "Black Market": "BlackMarket",
  Caerleon: "Caerleon",
  Brecilien: "Brecilien",
  Bridgewatch: "Bridgewatch",
  "Fort Sterling": "FortSterling",
  Lymhurst: "Lymhurst",
  Martlock: "Martlock",
  Thetford: "Thetford",
};

const QUALITY_MAPPING = {
  normal: 1,
  good: 2,
  outstanding: 3,
  excellent: 4,
  masterpiece: 5,
  all: "",
};

export const fetchMarketData = async (itemId, quality = "normal") => {
  try {
    const cities = Object.values(CITY_MAPPING).join(",");
    const qualityLower = quality.toLowerCase();

    if (qualityLower === "all") {
      // For 'all', fetch data for all quality levels and find minimums
      const allQualities = "1,2,3,4,5";
      const url = `${ALBION_API_BASE_URL}/stats/prices/${itemId}.json?locations=${cities}&qualities=${allQualities}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return transformMarketDataWithMinimums(data);
    } else {
      // For specific quality, use existing logic
      const qualityParam = QUALITY_MAPPING[qualityLower] || "";
      let url = `${ALBION_API_BASE_URL}/stats/prices/${itemId}.json?locations=${cities}`;
      if (qualityParam) {
        url += `&qualities=${qualityParam}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return transformMarketData(data);
    }
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

const transformMarketData = (apiData) => {
  const cityData = {};

  // Initialize all cities with empty data
  Object.keys(CITY_MAPPING).forEach((displayName) => {
    cityData[displayName] = {
      sellOrderMin: null,
      sellOrderMax: null,
      buyOrderMin: null,
      buyOrderMax: null,
    };
  });

  // Fill in actual data from API response
  apiData.forEach((item) => {
    const displayName = Object.keys(CITY_MAPPING).find(
      (key) => CITY_MAPPING[key] === item.city,
    );

    if (displayName) {
      cityData[displayName] = {
        sellOrderMin: item.sell_price_min,
        sellOrderMax: item.sell_price_max,
        buyOrderMin: item.buy_price_min,
        buyOrderMax: item.buy_price_max,
      };
    }
  });

  return cityData;
};

export const formatPrice = (price) => {
  if (!price || price === 0) return "-";
  return price.toLocaleString();
};
