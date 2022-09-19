import Searcher from './Searcher'
import {useState, useEffect, memo} from 'react'
import {apiWeather} from './../api_data/ApiWeather.js'
import './styles/card.css'

const Card = ({ setDaily, setHourlyForecast, setTime, days, months }) => {
  const [weather, setWeather] = useState() //guarda los datos de la api
  const [infoCity, setInfoCity] = useState() //guarda la ciudad de la busqueda para enviar las coords a la api

  useEffect(() => {               //permite hacer la peticion a la api una vez que el estado infoCity tenga informacion y no antes
    if(infoCity!==undefined)
      apiWeather(infoCity, setWeather)
  }, [infoCity])

  if(weather!==undefined){   //de no funcionar colorar en un useeffect con weather como dependencia
    setDaily(weather.daily)
    setHourlyForecast([])
    weather.hourly.map((hour, index)=>index<24 && setHourlyForecast((actual)=>[...actual, hour]))
  }

  const showDataWeather = () => {   //renderiza los datos del estado weather una vez que este tiene informacion
    if(weather!==undefined){
      const timestamp = new Date()
      const dateLocal = new Date((timestamp.getTime() + timestamp.getTimezoneOffset()*60*1000) + weather.timezone_offset*1000) //tiempo actual convertido a milisegundos, ya que es el parametro que acepta Date, de la zona horaria enviada por la api
      setTime(dateLocal)
      const regex = new RegExp('/', 'g')  //para reemplazar los caracteres en el timezone en linea 26
      const regex1 = new RegExp('_', 'g')  //lo mismo que arriba
      return(
        <div id="divretdata" className="pb-3 pt-3 px-4 mb-4">
          <p id="ptimezone" className="mb-1"> {weather.timezone.replace(regex, ", ").replace(regex1, " ")} </p>
          <p id="ptoday" className="mb-4"> {days[dateLocal.getDay()]}, {months[dateLocal.getMonth()]} {dateLocal.getDate()} at {(dateLocal.getHours()).toString().padStart(2, "0")}:{dateLocal.getMinutes().toString().padStart(2, "0")} hs </p>
          <div className="row">
            <div className="col-3 text-center" style={{backgroundImage:"url('http://openweathermap.org/img/wn/"+weather.current.weather[0].icon+".png')", backgroundPosition:"center", backgroundSize:"110px"}}>
              {/*<img src={"http://openweathermap.org/img/wn/"+weather.current.weather[0].icon+".png"} style={{width:"100px"}} className="m-0 p-0"/>*/}
            </div>
            <div className="col m-0 p-0">
              <p id="ptemp" className="mb-1"> {(weather.current.temp-273.15).toFixed(1) + " °C"} </p>
              <p id="pdescr"> {weather.current.weather[0].description} </p>
            </div>
          </div>
        </div>
      )
    }
  }

  return(
    <div>
      <Searcher infoCity={setInfoCity} city={infoCity}/>
      {showDataWeather()}
    </div>
  )
}

export default memo(Card)
