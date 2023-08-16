import { useState, useEffect } from "react";
import "./css/App.css";
import Card from "./components/Card";

function App() {
  const [score, setScore] = useState(0);
  const [customCatDataList, setCatDataList] = useState();

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
      setCatDataList(catDataList);
    })();
  }, []);
  const shuffleCatList = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const handleClick = (e) => {
    const nextCustomCatList = customCatDataList.map((customCatData) => {
      if (customCatData.id === e.target.id) {
        return { ...customCatData, selected: true };
      } else return customCatData;
    });
    shuffleCatList(nextCustomCatList);
    setCatDataList(nextCustomCatList);
  };

  return (
    <>
      <header className="game-title">Memory Game</header>
      <div className="cards">
        {customCatDataList
          ? customCatDataList.map((catData) => {
              return (
                <Card
                  url={catData.url}
                  name={catData.name}
                  key={catData.id}
                  id={catData.id}
                  onClick={handleClick}
                  selected={catData.selected}
                />
              );
            })
          : ""}
      </div>
    </>
  );
}

export default App;
