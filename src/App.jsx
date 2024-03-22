import { useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card.jsx";
import History from "./components/History.jsx";
import BanList from "./components/BanList.jsx";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL = `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=true&api_key=${ACCESS_KEY}`;

// console.log('URL: ' + URL);

function App() {
  const [catData, setCatData] = useState(null);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("No data found!");
      }

      // console.log('response.data: ', response.data);

      const filteredData = response.data.filter((cat) => {
        if (!cat.breeds || cat.breeds.length === 0) {
          return true;
        }

        const breed = cat.breeds[0];
        const banAttributes = [
          breed.name,
          `${breed.weight.imperial} lbs`,
          breed.origin,
          `${breed.life_span} years`,
        ];

        return !banList.some((attribute) => banAttributes.includes(attribute));
      });

      // console.log("Filtered data: ", filteredData);

      if (filteredData.length === 0) {
        throw new Error("No data found");
      }

      const randomCat =
        filteredData[Math.floor(Math.random() * filteredData.length)];
      setCatData(randomCat);
      setHistory((prev) => [...prev, randomCat]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBan = (attribute) => {
    setBanList((prevBanList) => {
      if (prevBanList.includes(attribute)) {
        return prevBanList.filter((item) => item !== attribute);
      } else {
        return [...prevBanList, attribute];
      }
    });
  };

  const handleCardBan = (attribute) => {
    handleBan(attribute);
  };

  const handleNext = () => {
    fetchData();
  };

  return (
    <div className="app">
      <History history={history} />
      <div className="card-display">
        <div className="card">
          <h1>Trippin' on Cats</h1>
          <h3 className="card-text">Discover cats from your wildest dreams!</h3>
          <p className="card-emoji">😺😸😹😻😼😽🙀😿😾</p>
          <div>
            {catData && <Card catData={catData} onBan={handleCardBan} />}
          </div>
        </div>
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
      <BanList banList={banList} onBan={handleBan} />
    </div>
  );
}

export default App;
