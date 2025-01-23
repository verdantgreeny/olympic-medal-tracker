import { useState, useEffect } from "react";
import MedalList from "./components/MedalList";
import InputBox from "./components/MedalForm";

const App = () => {
  const [countries, setCountries] = useState(saveCountires);

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

  const verify = function (countryName, gold, silver, bronze) {
    //입력 처리의 적정성 검증
    if (!countryName) {
      alert("국가이름을 입력해주세요");
      return false;
    } else if (!gold || !silver || !bronze) {
      alert("숫자를 입력해주세요");
      return false;
    } else if (
      gold < 0 ||
      silver < 0 ||
      bronze < 0 ||
      gold % 1 !== 0 ||
      silver % 1 !== 0 ||
      bronze % 1 !== 0
    ) {
      alert("숫자는 정수값을 입력해주세요");
      return false;
    } else {
      return true;
    }
  };

  const addCountryHandler = (e) => {
    e.preventDefault();
    const newCountry = {
      id: new Date().getTime(),
      countryName: countryName,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };

    if (!verify(countryName, gold, silver, bronze)) {
      reset()
      return;
    }

    //이미 등록된 국가일 경우 알림창 뜨게 하기 (중복 국가 처리)
    const addedCountry = countries.find(
      (country) => country.countryName === newCountry.countryName
    );
    if (addedCountry) {
      alert(`${newCountry.countryName}은(는) 이미 등록된 국가입니다.`);
      return;
    } else {
      setCountries([...countries, newCountry]);
      alert(`"${newCountry.countryName}" 등록`);
      reset();
      return;
    }
  };

  const deleteCountryHandler = (id) => {
    const newCountryList = countries.filter((country) => country.id !== id);
    setCountries(newCountryList);
  };

  const updateCountryHandler = (e) => {
    e.preventDefault();

    const updateCountry = countries.find((c) => c.countryName === countryName);

    //존재하지 않는 국가 알림
    if (!updateCountry) {
      alert("존재하지 않는 국가는 업데이트를 할 수 없습니다.");
      return;
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

    if (!verify(countryName, gold, silver, bronze)) {
      reset()
      return;
    }

    setCountries(updateCountryList);
    alert(`${updateCountry.countryName} 업데이트 완료`);
    reset();
    return;
  };

  //정렬 - 다시해보기!!!!!!!
  countries.sort(function (a, b) {
    if (+a.gold !== +b.gold) {
      return b.gold - a.gold;
    } else if (+a.silver !== +b.silver) {
      return b.silver - a.silver;
    } else {
      return b.bronze - a.bronze;
    }
  });

  //로컬스토리지
  //useEffect : sideEffect를 처리하기 위해 사용, 매번 컴포넌트가 렌더링 될 때 특정 조건에 의존하여 수행되며, 컴포넌트가 최대한 순수 함수를 유지할 수 있도록 도와주는 함수
  //sideEffect: 함수 내 특정 동작이 함수 외부에 영향을 끼쳐, 프로그램의 동작을 이해하기 어렵게 만드는 행위 (서버와의 통신, setTimeout, setInterval, 리액트 외부와의 상호작용)
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  function saveCountires() {
    let savedCoutires = JSON.parse(localStorage.getItem("countries"));
    console.log(savedCoutires);
    return savedCoutires || [];
  }

  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section>
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
            addCountryHandler={addCountryHandler}
            updateCountryHandler={updateCountryHandler}
          />
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
