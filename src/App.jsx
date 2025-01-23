import { useState, useEffect } from "react";
import MedalList from "./components/MedalList";
import InputBox from "./components/MedalForm";
import Radio from "./components/Radio";

const App = () => {
  const [countries, setCountries] = useState(saveCountires);
  const [countryName, setCountryName] = useState(""); //유저의 입력값을 담을 상태
  const [gold, setGlod] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  //로컬스토리지
  //useEffect : sideEffect를 처리하기 위해 사용, 매번 컴포넌트가 렌더링 될 때 특정 조건에 의존하여 수행되며, 컴포넌트가 최대한 순수 함수를 유지할 수 있도록 도와주는 함수
  //sideEffect: 함수 내 특정 동작이 함수 외부에 영향을 끼쳐, 프로그램의 동작을 이해하기 어렵게 만드는 행위 (서버와의 통신, setTimeout, setInterval, 리액트 외부와의 상호작용)
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  function saveCountires() {
    let savedCoutires = JSON.parse(localStorage.getItem("countries"));
    return savedCoutires || [];
  }

  const sortMedals = (e) => {
    e.preventDefault();
      countries.sort(function (a, b) {
        if (+a.gold !== +b.gold) {
          return b.gold - a.gold;
        } else if (+a.silver !== +b.silver) {
          return b.silver - a.silver;
        } else {
          return b.bronze - a.bronze;
        }
      });
      return setCountries([...countries])
  };

  const sortTotalMedals = (e) => {
    e.preventDefault();
      countries.sort((a,b)=> b.total-a.total);
      return setCountries([...countries])
  };

  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section>
          {/* 인풋부분 */}
          <InputBox
            countries={countries}
            setCountries={setCountries}
            countryName={countryName}
            gold={gold}
            silver={silver}
            bronze={bronze}
            setCountryName={setCountryName}
            setGlod={setGlod}
            setSilver={setSilver}
            setBronze={setBronze}
          />
          <Radio name="sort" value="1" onClick={sortMedals}> 금은동순 정렬 </Radio>
          <Radio  name="sort" value="2" onClick={sortTotalMedals}> 총메달순 정렬 </Radio>
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
                <th> 총합 </th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => {
                return (
                  <MedalList
                    countries={countries}
                    setCountries={setCountries}
                    country={country}
                    key={country.id}
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
