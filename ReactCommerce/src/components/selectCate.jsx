import React from 'react'
import { OptionsCate } from './Categories'
const SelectCategorie = (select) => {
  return (
    <select name="" id="">
{
    OptionsCate.map((categorie,index)=>(
        <option value={categorie} key={index}>{categorie}</option>
    ))
}
    </select>
  )
}

export default SelectCategorie