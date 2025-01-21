import React, {useState} from "react";

const App = () => {
  const [countries, setCountries] = useState([
    { id: 1, countryName: "대한민국", gold: 20, silver: 24, bronze: 40 },
    { id: 2, countryName: "미국", gold: 26, silver: 50, bronze: 70 },
    { id: 3, countryName: "일본", gold: 4, silver: 44, bronze: 30 },
    { id: 4, countryName: "중국", gold: 10, silver: 4, bronze: 0 },
  ]) ;

  const [countryName, setCountryName] = useState(''); //유저의 입력값을 담을 상태
  const [gold, setGlod] = useState('');
  const [silver, setSilver] = useState('');
  const [bronze, setBronze] = useState('');

  const addCountryHandler = () => {
    const newCountry = {
      id: countries.length + 1,
      countryName: countryName,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };

    setCountries([...countries, newCountry]);
  };

  const deleteCountryHandler = (id) => {
    const newCountryList = countries.filter((country)=>country.id !== id);
    setCountries(newCountryList); 
  };

  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section className="input-container">
          <div className="input-box">
            <div>국가명</div>
            <input value={countryName} type="text" 
             onChange={(e) => setCountryName(e.target.value)}/>
          </div>
          <div className="input-box">
            <div>금메달</div>
            <input value={gold} type="number" 
             onChange={(e) => setGlod(e.target.value)}/>
          </div>
          <div className="input-box">
            <div>은메달</div>
            <input value={silver} type="number" 
             onChange={(e) => setSilver(e.target.value)}/>
          </div>
          <div className="input-box">
            <div>동메달</div>
            <input value={bronze} type="number" 
             onChange={(e) => setBronze(e.target.value)}/>
          </div>
          <button onClick={addCountryHandler}> 추가 </button>
          <button> 업데이트 </button>
        </section>
        <section className="table-box">
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
                return <Country country={country} key={country.id} deleteCountryHandler={deleteCountryHandler}/>;
              })}
            </tbody>
          </table>
        </section>

        <section className="no-data">
          아직 추가된 국가가 없습니다. 메달을 추적하세요!
        </section>
      </main>
    </>
  );
};

export default App;

function Country(props) {
  return (
    <tr>
      <td>{props.country.countryName}</td>
      <td>{props.country.gold}</td>
      <td>{props.country.silver}</td>
      <td>{props.country.bronze}</td>
      <td>
        <button onClick={() => props.deleteCountryHandler(props.country.id)}>삭제</button>
      </td>
    </tr>
  );
}
