import { useState } from "react";
import Button from "./components/Button";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([
    {
      id: new Date().getTime(),
      countryName: "대한민국",
      gold: 20,
      silver: 24,
      bronze: 40,
    },
    {
      id: new Date().getTime() + 1,
      countryName: "미국",
      gold: 26,
      silver: 50,
      bronze: 70,
    },
    {
      id: new Date().getTime() + 2,
      countryName: "일본",
      gold: 4,
      silver: 44,
      bronze: 30,
    },
    {
      id: new Date().getTime() + 3,
      countryName: "중국",
      gold: 10,
      silver: 4,
      bronze: 0,
    },
  ]);

  const [countryName, setCountryName] = useState(""); //유저의 입력값을 담을 상태
  const [gold, setGlod] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  // if (countries.length === 0) {
  //   document.querySelector('.no-data').setAttribute("style", "display:flex;")
  //   document.querySelector('.table-box').setAttribute("style", "display:none;")
  // } else {
  //   document.querySelector('.no-data').setAttribute("style", "display:none;")
  //   document.querySelector('.table-box').setAttribute("style", "display:flex;")
  // }

  const reset = function () {
    setCountryName("");
    setGlod("");
    setSilver("");
    setBronze("");
    return
  };

  const addCountryHandler = () => {
    const newCountry = {
      id: new Date().getTime(),
      countryName: countryName,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };

    //입력 처리의 적정성 검증
    if (!countryName) {
      alert("국가이름을 입력해주세요!");
      return;
    } else if (!gold || !silver || !bronze) {
      alert("숫자를 입력해주세요!");
      return;
    } else if (gold <= 0 || silver <= 0 || bronze <= 0) {
      alert('"0"이상의 숫자값을 입력해 주세요!')
    } else {
      //이미 등록된 국가일 경우 알림창 뜨게 하기 (중복 국가 처리)
      const addedCountry = countries.find((country) => {
        // console.log("new", newCountry);
        return country.countryName === newCountry.countryName;
      });
      // console.log("added", addedCountry);
      if (addedCountry) {
        alert(`${newCountry.countryName}은(는) 이미 등록된 국가입니다.`);
      } else {
        setCountries([...countries, newCountry]);
        reset();
        return;
      }
    }
  };

  countries.sort((a, b) => b.gold - a.gold);

  const deleteCountryHandler = (id) => {
    const newCountryList = countries.filter((country) => country.id !== id);
    setCountries(newCountryList);
  };

  const updateCountryHandler = () => {
    // console.log(countryName);
    const updateCountry = countries.find((c) => c.countryName === countryName);

    const updateCountryList = countries.map((c) => {
      if (c.id === updateCountry.id) {
        return {
          ...c,
          gold: gold,
          silver: silver,
          bronze: bronze,
        };
      } else {
        return c;
      }
    });

    setCountries(updateCountryList);
    reset();
    return;
  };

  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section className="input-container">
          {/* 인풋부분 */}
          <div className="input-box">
            <div>국가명</div>
            <input
              value={countryName}
              type="text"
              onChange={(e) => setCountryName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <div>금메달</div>
            <input
              value={gold}
              type="number"
              onChange={(e) => setGlod(e.target.value)}
            />
          </div>
          <div className="input-box">
            <div>은메달</div>
            <input
              value={silver}
              type="number"
              onChange={(e) => setSilver(e.target.value)}
            />
          </div>
          <div className="input-box">
            <div>동메달</div>
            <input
              value={bronze}
              type="number"
              onChange={(e) => setBronze(e.target.value)}
            />
          </div>
          <Button onClick={addCountryHandler}> 추가 </Button>
          <Button onClick={updateCountryHandler}> 업데이트 </Button>
        </section>
        <section
          className={countries.length !== 0 ? "table-box" : "table-box none"}
        >
          {/* 메달순위표시하는 테이블 */}
          <table>
            <thead>
              <tr>
                <th>국가명</th>
                <th>금메달</th>
                <th>은메달</th>
                <th>동미달</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => {
                return (
                  <Country
                    country={country}
                    key={country.id}
                    deleteCountryHandler={deleteCountryHandler}
                  />
                );
              })}
            </tbody>
          </table>
        </section>

        <section
          className={countries.length === 0 ? "no-data" : "no-data none"}
        >
          아직 추가된 국가가 없습니다. 메달을 추적하세요!
        </section>
      </main>
    </>
  );
};

export default App;



