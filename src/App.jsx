import React from "react";

const App = () => {
  const countries = [
    { id: 1, countryName: "대한민국", gold: 20, silver: 24, bronze: 40 },
    { id: 2, countryName: "미국", gold: 16, silver: 50, bronze: 70 },
    { id: 3, countryName: "중국", gold: 10, silver: 44, bronze: 30 },
    { id: 4, countryName: "일본", gold: 2, silver: 4, bronze: 0 },
  ];


  return (
    <>
      <header>
        <h1> 2025 Sparta Olympic </h1>
      </header>
      <main>
        <section className="input-container">
          <div className="input-box">
            <div>국가명</div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>금메달</div>
            <input type="number" />
          </div>
          <div className="input-box">
            <div>은메달</div>
            <input type="number" />
          </div>
          <div className="input-box">
            <div>동메달</div>
            <input type="number" />
          </div>
          <button> 추가 </button>
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
                return <Country country={country} key={country.id} />;
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
        <button>삭제</button>
      </td>
    </tr>
  );
}
