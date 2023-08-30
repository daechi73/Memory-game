import { useState, useEffect } from "react";
import "./css/App.css";
import Card from "./components/Card";
import CatMusic from "./assets/catMusic.mp3";
import Button from "./components/Button";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [customCatDataList, setCatDataList] = useState();
  const backgroundMusic = new Audio(CatMusic);
  backgroundMusic.currentTime = 4;
  backgroundMusic.volume = 0;
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

  const resetSelectedAndScore = (array) => {
    const resetArray = array.map((customCatData) => {
      return { ...customCatData, selected: false };
    });
    setScore(0);
    return resetArray;
  };

  const handleClick = (e) => {
    let resetSelectedPass = false;
    let nextCustomCatList = customCatDataList.map((customCatData) => {
      if (customCatData.id === e.target.id) {
        if (customCatData.selected) {
          //add score reset and selected reset here
          resetSelectedPass = true;
          return { ...customCatData, selected: false };
        } else {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore > bestScore) setBestScore(newScore);
          return { ...customCatData, selected: true };
        }
      } else {
        return customCatData;
      }
    });
    if (resetSelectedPass)
      nextCustomCatList = resetSelectedAndScore(nextCustomCatList);
    shuffleCatList(nextCustomCatList);
    setCatDataList(nextCustomCatList);
  };

  return (
    <>
      <section className={gameStart ? "startMenu-hidden" : "startMenu-show"}>
        <div className="startMenu-title">Memory Game</div>
        <summary className="startMenu-summary">
          Win scores by consecutively picking unselected cards!
        </summary>
        <Button setGameStart={setGameStart} audio={backgroundMusic} />
      </section>
      <header className="game-title">Memory Game</header>

      <section className="scoreBoard">
        <section className="score">Score: {score}</section>
        <section className="bestScore">Best Score: {bestScore}</section>
      </section>
      {gameStart ? (
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
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
