import { useState, useEffect } from "react";
import "./css/App.css";
import Card from "./components/Card";

function App() {
  const [score, setScore] = useState(0);
  const [customCatDataList, setCatData] = useState();
  const handleClick = () => {
    console.log("working");
  };
  useEffect(() => {
    const getCats = (async () => {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=en7dMyIj3inRfEXKjj5pj9Hz0CjYPUx1&q=cat&limit=16&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
        { mode: "cors" }
      );
      const data = await response.json();
      let catDataList = [];
      data.data.forEach((catdata) => {
        catDataList.push({
          id: catdata.id,
          name: catdata.title,
          url: catdata.images.original.url,
          selected: false,
        });
      });
      catDataList = catDataList.map((catData) => {
        return (
          <Card
            url={catData.url}
            name={catData.name}
            key={catData.id}
            onClick={handleClick}
            selected={catData.selected}
          />
        );
      });
      setCatData(catDataList);
    })();
  }, []);
  // console.log(customCatDataList);
  // console.log("hello");
  return (
    <>
      <header className="game-title">Memory Game</header>
      <div className="cards">{customCatDataList}</div>
    </>
  );
}

export default App;
