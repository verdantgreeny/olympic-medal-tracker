import { useState, useEffect } from "react";
import MedalList from "./components/MedalList";
import InputBox from "./components/MedalForm";
import Radio from "./components/Radio";

const App = () => {
  const [countries, setCountries] = useState(saveCountries);
  //로컬스토리지
  //useEffect : sideEffect를 처리하기 위해 사용, 매번 컴포넌트가 렌더링 될 때 특정 조건에 의존하여 수행되며, 컴포넌트가 최대한 순수 함수를 유지할 수 있도록 도와주는 함수
  //sideEffect: 함수 내 특정 동작이 함수 외부에 영향을 끼쳐, 프로그램의 동작을 이해하기 어렵게 만드는 행위 (서버와의 통신, setTimeout, setInterval, 리액트 외부와의 상호작용)
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  function saveCountries() {
    let savedCountries = JSON.parse(localStorage.getItem("countries"));
    return savedCountries || [];
  }

  //정렬 옵션
  const [selectRadio, setSelectRadio] = useState("1");
  const handleChange = (e) => {
    setSelectRadio(e.target.value);
  };

  const changeSortOption = () => {
    if (selectRadio === "1") {
      const sortedMedals = countries.sort((a, b) => {
        if (+a.gold !== +b.gold) {
          return b.gold - a.gold;
        } else if (+a.silver !== +b.silver) {
          return b.silver - a.silver;
        } else {
          return b.bronze - a.bronze;
        }
      });
      return sortedMedals;
    } else {
      const sortedMedals = countries.sort((a, b) => {
        const aTotal = Number(a.gold) + Number(a.silver) + Number(a.bronze);
        const bTotal = Number(b.gold) + Number(b.silver) + Number(b.bronze);
        return bTotal - aTotal;
      });
      return sortedMedals
    }
  };
  
  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section>
          {/* 인풋부분 */}
          <InputBox countries={countries} setCountries={setCountries} />
          <Radio
            name="medalsSort"
            value="1"
            checked={selectRadio === "1"}
            onChange={handleChange}
          >
            {" "}
            금은동순 정렬{" "}
          </Radio>
          <Radio
            name="medalsSort"
            value="2"
            checked={selectRadio === "2"}
            onChange={handleChange}
          >
            {" "}
            총메달순 정렬{" "}
          </Radio>
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
              {changeSortOption()&&changeSortOption().map((country) => {
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
