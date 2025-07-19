import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm.jsx";
import { Subheading } from "../catalyst/heading.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table.jsx";
import { fetchMarketData, formatPrice } from "../services/albionApi.js";

const Search = () => {
  const [item, setItem] = useState(null);
  const [quality, setQuality] = useState("Normal");
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarketData = async () => {
      if (!item?.id) {
        setMarketData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchMarketData(item.id, quality);
        setMarketData(data);
      } catch (err) {
        setError("Failed to fetch market data");
        console.error("Market data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, [item, quality]);

  const cities = [
    "Black Market",
    "Caerleon",
    "Brecilien",
    "Bridgewatch",
    "Fort Sterling",
    "Lymhurst",
    "Martlock",
    "Thetford",
  ];

  return (
    <div className="sflex flex-col w-full max-w-2xl">
      <SearchForm
        item={item}
        setItem={setItem}
        quality={quality}
        setQuality={setQuality}
      />

      {item && (
        <div className="mt-5 w-full max-w-3xl">
          <Subheading>{item.name}</Subheading>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>City</TableHeader>
                <TableHeader>Sell Order</TableHeader>
                <TableHeader>Instant Sell</TableHeader>
                <TableHeader>Buy Price</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">Black Market</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Caerleon</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Brecilien</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Bridgewatch</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Fort Sterling</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Lymhurst</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Martlock</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Thetford</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Search;
