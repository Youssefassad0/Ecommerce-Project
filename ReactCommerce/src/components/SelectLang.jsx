/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";

const LanguageSelect = ({ handleLanguageChange }) => {
  const languageOptions = [
    { value: "en", label: "En" },
    { value: "fr", label: "Fr" },
    { value: "ar", label: "Ar" },
  ];

  return (
    <Select
      options={languageOptions}
      onChange={handleLanguageChange}
      isSearchable={false}
      defaultValue={languageOptions[0]}
    />
  );
};

export default LanguageSelect;
