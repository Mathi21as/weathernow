import { useState, useEffect, memo } from 'react'
import { apiCity } from './../api_data/ApiWeather.js'
import './styles/showListCities.css'

const ShowListCities = ({ search, setInfoCity }) => {
  const [cities, setCities] = useState([])
  const [band, setBand] = useState(false)

  useEffect(() => {
    apiCity(search, setCities)
  }, [search])

  const handleClick = (el) => {
    setInfoCity(el)
  }

  if(cities.cod!==undefined)
    return <p id="pMessage" className='m-3'>{cities.message}</p>

  if(cities.length!==0){
  return(
    <ul id="ulrend" className="w-100">
      {
        cities.map((el, index)=>{
          return <button onClick={() => handleClick(el)} key={index*3} className="m-1" id="btnret"> <li className="list-unstyled" key={index}> {el.name}, {el.country} </li> </button>
        })
      }
    </ul>
  )}
  else {
    setTimeout(() => setBand(true), 1000)  //al colocar el retorno de la etiqueta p dentro del settimeout no se renderiza, por esa razon lo desarrollo con una bandera
  }

  if(band)
    return <p id="pnotfound" className='m-2'>City not found</p>

  return <p>Loading...</p>
}


export default memo(ShowListCities)
