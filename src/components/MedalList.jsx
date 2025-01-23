import React from "react";
import Button from "./Button";

const MedalList = function (props) {
  const { countryName, gold, silver, bronze, id } = props.country;
  const { countries, setCountries} = props;

  const deleteCountryHandler = (id) => {
    const newCountryList = countries.filter((country) => country.id !== id);
    setCountries(newCountryList);
  };

  return (
    <tr>
      <td>{countryName}</td>
      <td>{gold}</td>
      <td>{silver}</td>
      <td>{bronze}</td>
      <td>
        <Button id="delete-btn" onClick={() => deleteCountryHandler(id)}>
          삭제
        </Button>
      </td>
    </tr>
  );
};

export default MedalList;
