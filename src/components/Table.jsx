import { useEffect, useState } from "react";
import Paginator from "./Paginator";
import Loader from "./Loader";

const MAX_ROWS = 10;

/* eslint-disable react/prop-types */
const Table = ({ coins }) => {
  const [coinsToMap, setCoinsToMap] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleHeaderClick = (property) => {
    if (
      sortConfig &&
      sortConfig.property === property &&
      sortConfig.order === "desc"
    ) {
      setCoinsToMap(
        coins.slice(currentPageIndex * MAX_ROWS, (currentPageIndex + 1) * 10)
      );
      setSortConfig(null);
      return;
    }
    setSortConfig((config) => {
      return {
        property: property,
        order: !config ? "asc" : config.property === property ? "desc" : "asc",
      };
    });
  };

  const handleNext = () => {
    if (currentPageIndex + 1 >= Math.ceil(coins.length / MAX_ROWS)) return;
    setSortConfig(null);
    setCurrentPageIndex((current) => current + 1);
  };
  const handlePrevious = () => {
    if (currentPageIndex <= 0) return;
    setSortConfig(null);
    setCurrentPageIndex((current) => current - 1);
  };

  const handlePageChange = (num) => {
    setSortConfig(null);
    setCurrentPageIndex(num);
  };

  useEffect(() => {
    setCoinsToMap(
      coins.slice(currentPageIndex * MAX_ROWS, (currentPageIndex + 1) * 10)
    );
  }, [coins, currentPageIndex]);

  useEffect(() => {
    if (!sortConfig) return;
    else
      switch (sortConfig.property) {
        case "name":
          if (sortConfig.order === "asc")
            setCoinsToMap((coins) =>
              coins.slice(0, 10).sort((a, b) => a.name.localeCompare(b.name))
            );
          else {
            setCoinsToMap((coins) =>
              coins.slice(0, 10).sort((a, b) => b.name.localeCompare(a.name))
            );
          }
          break;
        case "price":
          if (sortConfig.order === "asc")
            setCoinsToMap((coins) =>
              coins
                .slice(0, 10)
                .sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd))
            );
          else {
            setCoinsToMap((coins) =>
              coins
                .slice(0, 10)
                .sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd))
            );
          }
          break;
        case "supply":
          if (sortConfig.order === "asc")
            setCoinsToMap((coins) =>
              coins
                .slice(0, 10)
                .sort((a, b) => Number(a.maxSupply) - Number(b.maxSupply))
            );
          else {
            setCoinsToMap((coins) =>
              coins
                .slice(0, 10)
                .sort((a, b) => Number(b.maxSupply) - Number(a.maxSupply))
            );
          }
          break;
        default:
          break;
      }
  }, [sortConfig, coins]);

  if (coins.length === 0)
    return (
      <p className="bg-yellow-50 ring ring-yellow-400 text-yellow-500 p-4 text-center rounded-lg text-2xl w-1/2 m-auto">
        Loading Data...
      </p>
    );

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full ">
      <table className="table-auto text-left  border  shadow-2xl bg-white w-4/5 ">
        <thead className="text-gray-500 ">
          <tr>
            <th className="p-2 font-extralight pl-4">Rank</th>
            <th
              className={`p-2 font-extralight hover:cursor-pointer underline underline-offset-2  ${
                sortConfig && sortConfig.property === "name"
                  ? "font-semibold"
                  : ""
              }`}
              onClick={() => handleHeaderClick("name")}
            >
              Name
              {sortConfig &&
                sortConfig.property === "name" &&
                sortConfig.order === "asc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              {sortConfig &&
                sortConfig.property === "name" &&
                sortConfig.order === "desc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
            </th>
            <th className="p-2 font-extralight">Symbol</th>
            <th
              className={`p-2 font-extralight hover:cursor-pointer underline underline-offset-2 ${
                sortConfig && sortConfig.property === "price"
                  ? "font-semibold"
                  : ""
              }`}
              onClick={() => handleHeaderClick("price")}
            >
              Current Price
              {sortConfig &&
                sortConfig.property === "price" &&
                sortConfig.order === "asc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              {sortConfig &&
                sortConfig.property === "price" &&
                sortConfig.order === "desc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
            </th>
            <th
              className={`p-2 font-extralight hover:cursor-pointer underline underline-offset-2 ${
                sortConfig && sortConfig.property === "supply"
                  ? "font-semibold"
                  : ""
              }`}
              onClick={() => handleHeaderClick("supply")}
            >
              Max Supply
              {sortConfig &&
                sortConfig.property === "supply" &&
                sortConfig.order === "asc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              {sortConfig &&
                sortConfig.property === "supply" &&
                sortConfig.order === "desc" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
            </th>
            <th className="p-2 font-extralight">Change(24Hr)</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {coinsToMap.map((coin) => (
            <tr key={coin.id} className="hover:bg-gray-100 border-b">
              <td className="pl-4 p-2">{coin.rank}</td>
              <td className=" p-2 flex items-center gap-4">
                <img
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={`Logo of ${coin.name}`}
                  className="w-6 h-6 rounded-full"
                />
                {coin.name}
              </td>
              <td className=" p-2">{coin.symbol}</td>
              <td className=" p-2">
                ${" "}
                {new Intl.NumberFormat().format(
                  Number(coin.priceUsd).toFixed(1)
                )}
              </td>
              <td className=" p-2">
                {new Intl.NumberFormat("en-GB", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(Number(coin.maxSupply).toFixed(0))}
              </td>
              <td
                className={` p-2 ${
                  Number(coin.changePercent24Hr) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {Number(coin.changePercent24Hr).toFixed(2)}%
              </td>
              {/* <td className=" p-2">{coin.ath}</td>
          <td className=" p-2">{coin.atl}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator
        MAX_ROWS={MAX_ROWS}
        coinsLength={coins.length}
        currentPageIndex={currentPageIndex}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
