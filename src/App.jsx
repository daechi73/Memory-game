import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [score, setScore] = useState(0);
  const [customCatDataList, setCatData] = useState();

  useEffect(() => {
    const getCats = (async () => {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=en7dMyIj3inRfEXKjj5pj9Hz0CjYPUx1&q=cat&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
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
          <Card url={catData.url} name={catData.name} key={catData.id} />
          // <div key={catData.id}>
          //   <img src={catData.url} alt="card" className="card" />
          //   {catData.name}
          // </div>
        );
      });
      setCatData(catDataList);
    })();
  }, []);
  console.log(customCatDataList);
  console.log("hello");
  return <>{customCatDataList}</>;
}

export default App;
