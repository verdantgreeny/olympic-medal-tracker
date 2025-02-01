import { useState } from "react";
import Button from "./Button";

const InputBox = function (props) {
  const { countries, setCountries } = props;

  const [countryName, setCountryName] = useState(""); //입력값을 담을 상태
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  const reset = function () {
    setCountryName("");
    setGold("");
    setSilver("");
    setBronze("");
    return;
  };

  //입력 처리의 적정성 검증
  const verify = function (countryName, gold, silver, bronze) {
    if (!countryName || /\d/.test(countryName)) {
      ///\d/  : 숫자 하나를 뜻하는 정규식 , test(str): str에 대해 정규식 패턴을 확인해 true/false 여부를 반환
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
      total: Number(gold) + Number(silver) + Number(bronze),
    };

    if (!verify(countryName, gold, silver, bronze)) {
      reset();
      return false;
    }

    //이미 등록된 국가일 경우 알림창 뜨게 하기 (중복 국가 처리)
    const addedCountry = countries.find(
      (country) => country.countryName === newCountry.countryName
    );
    if (addedCountry) {
      alert(`${newCountry.countryName}은(는) 이미 등록된 국가입니다.`);
    } else {
      setCountries([...countries, newCountry]);
      alert(`"${newCountry.countryName}" 등록`);
      reset();
    }
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
          total: Number(gold) + Number(silver) + Number(bronze), 
        };
      } else {
        return c;
      }
    });

    if (!verify(countryName, gold, silver, bronze)) {
      reset();
    }
    setCountries(updateCountryList);
    alert(`${updateCountry.countryName} 업데이트 완료`);
    reset();
  };

  return (
    <form className="input-form">
      <div htmlFor="countryName" className="input-box">
        <div>국가명</div>
        <input
          value={countryName}
          type="text"
          placeholder="국가명"
          onChange={(e) => setCountryName(e.target.value)}
        />
      </div>
      <div className="input-box">
        <div>금메달</div>
        <input
          value={gold}
          type="number"
          placeholder="   금메달 숫자"
          onChange={(e) => setGold(e.target.value)}
        />
      </div>
      <div className="input-box">
        <div>은메달</div>
        <input
          value={silver}
          type="number"
          placeholder="   은메달 숫자"
          onChange={(e) => setSilver(e.target.value)}
        />
      </div>
      <div className="input-box">
        <div>동메달</div>
        <input
          value={bronze}
          type="number"
          placeholder="   동메달 숫자"
          onChange={(e) => setBronze(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" onClick={addCountryHandler}> 추가 </Button>
        <Button type="submot" onClick={updateCountryHandler}>
          {" "}
          업데이트{" "}
        </Button>
      </div>
    </form>
  );
};

export default InputBox;
