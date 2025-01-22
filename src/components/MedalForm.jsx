import React from "react";

const InputBox = function (props) {
  const {
    countryName,
    gold,
    silver,
    bronze,
    setCountryName,
    setGlod,
    setSilver,
    setBronze,
  } = props;

  return (
    <form className="input-form">
      <div className="input-box">
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
          onChange={(e) => setGlod(e.target.value)}
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
    </form>
  );
};

export default InputBox;
