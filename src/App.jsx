import { useState } from "react";
import Button from "./components/Button";
import MedalList from "./components/MedalList";
import InputBox from "./components/MedalForm";

const App = () => {
  const [countries, setCountries] = useState([
    {
      id: new Date().getTime(),
      countryName: "미국",
      gold: 24,
      silver: 12,
      bronze: 40,
    },
    {
      id: new Date().getTime() + 1,
      countryName: "대한민국",
      gold: 24,
      silver: 20,
      bronze: 14,
    },
    {
      id: new Date().getTime() + 2,
      countryName: "일본",
      gold: 4,
      silver: 4,
      bronze: 0,
    },
    {
      id: new Date().getTime() + 3,
      countryName: "중국",
      gold: 4,
      silver: 4,
      bronze: 3,
    },
  ]);

  const [countryName, setCountryName] = useState(""); //유저의 입력값을 담을 상태
  const [gold, setGlod] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  const reset = function () {
    setCountryName("");
    setGlod("");
    setSilver("");
    setBronze("");
    return;
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
      alert("국가이름을 입력해주세요");
      return;
    } else if (!gold || !silver || !bronze) {
      alert("숫자를 입력해주세요");
      return;
    } else if (
      gold < 0 ||
      silver < 0 ||
      bronze < 0 ||
      gold % 1 !== 0 ||
      silver % 1 !== 0 ||
      bronze % 1 !== 0
    ) {
      alert("숫자는 정수값을 입력해주세요");
      return;
    } else {
      //이미 등록된 국가일 경우 알림창 뜨게 하기 (중복 국가 처리)
      const addedCountry = countries.find(
        (country) => country.countryName === newCountry.countryName
      );
      if (addedCountry) {
        alert(`${newCountry.countryName}은(는) 이미 등록된 국가입니다.`);
        return;
      } else {
        setCountries([...countries, newCountry]);
        reset();
        return;
      }
    }
  };

  const deleteCountryHandler = (id) => {
    const newCountryList = countries.filter((country) => country.id !== id);
    setCountries(newCountryList);
  };

  const updateCountryHandler = () => {
    const updateCountry = countries.find((c) => c.countryName === countryName);

    //존재하지 않는 국가 알림
    if (!updateCountry) {
      alert("존재하지 않는 국가는 업데이트를 할 수 없습니다.");
    }

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
    alert(`${updateCountry.countryName} 업데이트 완료`);
    reset();
    return;
  };

  //정렬
  //  countries.sort((a, b) => b.gold - a.gold);
  countries.sort(function (a, b) {
    if (+a.gold !== +b.gold) {
      return b.gold - a.gold;
    } else if (+a.silver !== +b.silver) {
      return b.silver - a.silver;
    } else {
      return b.bronze - a.bronze;
    }
  });

  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section id="input-container">
          {/* 인풋부분 */}
          <InputBox
            countryName={countryName}
            gold={gold}
            silver={silver}
            bronze={bronze}
            setCountryName={setCountryName}
            setGlod={setGlod}
            setSilver={setSilver}
            setBronze={setBronze}
          />
          <div>
            {" "}
            <Button onClick={addCountryHandler}> 추가 </Button>
            <Button onClick={updateCountryHandler}> 업데이트 </Button>{" "}
          </div>
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
                <th>동메달</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => {
                return (
                  <MedalList
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
