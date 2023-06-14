import { useEffect, useState } from "react";
import "./App.css";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "https://hp-api.onrender.com/api/characters"
  //       );
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //       setLoading(false);
  //     };

  //     fetchData();
  //   }, 2000);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log("jsonData", jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function cleanList() {
    console.log("clean");
  }
  function fullList() {
    console.log("full");
  }
  const handleSelectOption = (event) => {
    console.log("select");
    const selectedValue = event.target.value;
    console.log(selectedValue);
  };
  const handleSearchName = (event) => {
    console.log("search");
    const searchText = event.target.value;
    console.log(searchText);
  };

  return (
    <div className="App">
      {loading ? (
        <div>
          <h1>Loading...</h1>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div>
          <div>Lista de aspirantes a hogwarts</div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <button
                    onClick={cleanList}
                    className="btn btn-outline-primary"
                  >
                    Limpiar lista
                  </button>
                </th>
                <th>
                  <button
                    onClick={fullList}
                    className="btn btn-outline-primary"
                  >
                    Limpiar completa
                  </button>
                </th>
                <th>
                  <select onChange={handleSelectOption} className="form-select">
                    <option value={"Gryffindor"}>Gryffindor</option>
                    <option value={"Hufflepuff"}>Hufflepuff</option>
                    <option value={"Ravenclaw"}>Ravenclaw</option>
                    <option value={"Slytherin"}>Slytherin</option>
                  </select>
                </th>
                <th>
                  <div className="input-group">
                    <input
                      onChange={handleSearchName}
                      type="text"
                      className="form-control"
                    />
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          {/* Lista de aspirantes a hogwartscontenido de lista */}
        </div>
      )}
    </div>
  );
}

export default App;
