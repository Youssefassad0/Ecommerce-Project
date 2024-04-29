import React from 'react'
import { OptionsCate } from './Categories'
const SelectCategorie = (select) => {
  return (
    <select name="select" className='selectCat' >
{
    OptionsCate.map((categorie,index)=>(
        <option value={categorie} key={index}>{categorie}</option>
    ))
}
    </select>
  )
}

export default SelectCategorie