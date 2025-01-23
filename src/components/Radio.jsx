import React from "react";

const Radio = ({countries}) => {
const sortGoldMedals = () => {
      //정렬 - 다시해보기!!!!!!!
      console.log("onclick")   
  countries.sort(function (a, b) {
    console.log(a.gold)
    if (+a.gold !== +b.gold) {
      return b.gold - a.gold;
    } else if (+a.silver !== +b.silver) {
      return b.silver - a.silver;
    } else {
      return b.bronze - a.bronze;
    }
  });
}

const sortTotalMedals = () => {}

  return (
    <>
      <label>
        <input type="radio" name="sort" defaultChecked onClick={sortGoldMedals}/> 금은동순 정렬
        <input type="radio" name="sort" onClick={sortTotalMedals}/> 총메달 수 정렬
      </label>
    </>
  );
};

export default Radio;
