import { useEffect, useState } from "react";
import Table from "./components/Table";
import { getAllCoins as getAllCoinsAPI } from "./services/apiCoins";

const App = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    try {
      const getAllCoins = async () => {
        const data = await getAllCoinsAPI();
        setCoins(data);
      };

      getAllCoins();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="font-gabarito h-screen flex flex-col bg-gray-100">
      <nav className="flex justify-between items-center px-4 py-6 ">
        <h4 className="group cursor-default text-2xl font-semibold uppercase hover:text-gray-500">
          <span className="tracking-wider mr-2">Crypto</span>
          <span className="text-gray-500 text-xs lowercase font-raleway group-hover:text-black">
            By Tharun
          </span>
        </h4>
      </nav>
      <main className="p-8  overflow-scroll grow">
        <Table coins={coins} />
      </main>
    </div>
  );
};

export default App;
