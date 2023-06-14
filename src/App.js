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

  useEffect(() => {
    fetchData();
  }, []);

  function cleanList() {
    setLoading(true);
    console.log("clean");
    setData(null);
    setLoading(false);
  }
  function fullList() {
    console.log("full");
    setLoading(true);
    fetchData();
  }
  const handleSelectOption = async (event) => {
    console.log("select");
    const selectedValue = event.target.value;
    console.log(selectedValue);
    // setLoading(true);
    if (selectedValue === "select") {
      fetchData();
    } else {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        const jsonData = await response.json();
        console.log("jsonData in select filter", jsonData);
        const filteredData = jsonData.filter(
          (item) => item.house === selectedValue
        );
        console.log("filteredData", filteredData);
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };
  const handleSearchName = async (event) => {
    console.log("search");
    const searchText = event.target.value;
    console.log(searchText);

    if (searchText === null) {
      setData(null);
    } else {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        const jsonData = await response.json();
        console.log("jsonData in select filter", jsonData);

        const filteredDataName = jsonData.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log("filteredDataName", filteredDataName);
        if (filteredDataName.length === 0) {
          setData(null);
        } else {
          setData(filteredDataName);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  const deleteList = (id) => {
    console.log(id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="App">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>Loading...</h1>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div>
          <div>
            {" "}
            <h1 className="display-4">Lista de aspirantes a hogwarts</h1>{" "}
          </div>
          <div style={{ margin: "2%" }} className="row">
            <div className="col">
              <button
                onClick={cleanList}
                className="form-control btn btn-outline-primary"
              >
                Limpiar lista
              </button>
            </div>
            <div className="col">
              <button
                onClick={fullList}
                className="form-control btn btn-outline-primary"
              >
                Lista completa
              </button>
            </div>
            <div className="col">
              <select onChange={handleSelectOption} className="form-select">
                <option value="select">Seleccione una opcion</option>
                <option value={"Gryffindor"}>Gryffindor</option>
                <option value={"Hufflepuff"}>Hufflepuff</option>
                <option value={"Ravenclaw"}>Ravenclaw</option>
                <option value={"Slytherin"}>Slytherin</option>
              </select>
            </div>
            <div className="col">
              <div className="input-group">
                <input
                  type="text"
                  onChange={handleSearchName}
                  className="form-control"
                />
                <button
                  // onClick={searchName}
                  className="btn-success input-group-text"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
          </div>
          <div style={{ margin: "3%" }} className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "16%", height: "auto" }}>Foto</th>
                  <th style={{ width: "16%", height: "auto" }}>Nombre</th>
                  <th style={{ width: "16%", height: "auto" }}>Especie</th>
                  <th style={{ width: "16%", height: "auto" }}>Casa</th>
                  <th style={{ width: "16%", height: "auto" }}>Patronus</th>
                  <th style={{ width: "16%", height: "auto" }}>Acciones</th>
                </tr>
              </thead>

              {data !== null ? (
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.image ? (
                          <img
                            className="img-fluid"
                            src={item.image}
                            alt={item.id}
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          <p>No hay información por mostrar...</p>
                        )}
                      </td>
                      <td>
                        {item.name ? (
                          item.name
                        ) : (
                          <p>No hay información por mostrar...</p>
                        )}
                      </td>
                      <td>
                        {item.species ? (
                          item.species
                        ) : (
                          <p>No hay información por mostrar...</p>
                        )}
                      </td>
                      <td>
                        {item.house ? (
                          item.house
                        ) : (
                          <p>No hay información por mostrar...</p>
                        )}
                      </td>
                      <td>
                        {item.patronus ? (
                          item.patronus
                        ) : (
                          <p>No hay información por mostrar...</p>
                        )}
                      </td>
                      <td>
                        {item.id ? (
                          <button
                            className="form-control btn btn-info"
                            onClick={() => deleteList(item.id)}
                          >
                            Ocultar
                          </button>
                        ) : (
                          "No hay información por mostrar..."
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6}>Lista Vacía</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
