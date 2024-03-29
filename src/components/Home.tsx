import { useState, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";
import { ThemeContext } from "../context/theme";

const Home = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [info, setInfo] = useState(data);
  const uniqueRegion = [...new Set(data.map((region) => region.region))];

  const handleNavigate = (e: any) => {
    navigate(e);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setInfo(
      data.filter((subject) =>
        subject.name == ""
          ? data
          : subject.name.toLowerCase().includes(searchInput)
      )
    );
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value.toLowerCase();
    setInfo(
      data.filter((region) =>
        filterValue === "all"
          ? data
          : region.region.toLowerCase() === filterValue
      )
    );
  };
  return (
    <div className={theme?.theme ? "dark-main" : "main"}>
      <div className={theme?.theme ? "dark-search" : "search"}>
        <div className="search-bar">
          <button>
            <img src="icons/search-icon.svg" alt="" />
          </button>
          <hr />
          <input
            onChange={handleSearch}
            type="text"
            name=""
            id=""
            placeholder="Search for a country..."
          />
        </div>

        <select name="" id="" onChange={handleFilter}>
          <option hidden>Filter by Region</option>
          <option value={"all"}>All</option>
          {uniqueRegion.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="cards">
        {info.map((data, index) => {
          return (
            <div
              className={theme?.theme ? "dark-card" : "card"}
              key={index}
              onClick={() => {
                handleNavigate(data.name);
              }}
            >
              <div className="img-container">
                <img src={data.flags.png} alt="" />
              </div>

              <div className="context">
                <h2>{data.name}</h2>
                <p>
                  Population: <span>{data.population}</span>
                </p>
                <p>
                  Region: <span>{data.region}</span>
                </p>
                <p>
                  Capital: <span>{data.capital}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
