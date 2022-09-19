import { useState, memo } from 'react'
import Card from './Card'
import './styles/extended.css'

const Extended = ({keyDel, delCard}) => {
  const [dailyForecast, setDailyForecast] = useState([])
  const [hourlyForecast, setHourlyForecast] = useState([])
  const [deleteCard, setDeleteCard] = useState(false)
  const [days] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [months] = useState(['Junary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'])
  const [timelocal, setTimelocal] = useState()
  const [activehourly, setActivehourly] = useState(false)
  const [activedaily, setActivedaily] = useState(false)


  if(deleteCard===true){
    delCard(keyDel)
  }

  const rend = () => {
    if(activedaily===true){
      return(
        <div id="divcontentdailyfore" className="p-0">
          {
            dailyForecast.map((forecast, index)=>{
              return(
                  <div id="divreturndaily" key={index*3} className="mx-2 text-center">
                    <img src={"http://openweathermap.org/img/wn/"+forecast.weather[0].icon+".png"} alt="weather img"/>
                    <p id="p1divret" className="mb-0 p-0">{forecast.weather[0].description}</p>
                    <p id="p2divret" className="mb-0 p-0">{days[timelocal.getDay()+index+1===7 ? 0 : timelocal.getDay()+index+1<7 ? timelocal.getDay()+index+1 : timelocal.getDay()+index-6<7 ? timelocal.getDay()+index-6 : 0].substr(0,3).toUpperCase()}</p>
                  </div>
              )
            })
          }
        </div>
      )
    }
    else if(activehourly===true){
      return(
        <div id="divreturnhourly" className="p-0">
          {
            hourlyForecast.map((forecast, index)=>{
              return(
                  <div key={index} className="row align-items-center w-100 text-center mb-1">
                    <div className="col-3 pHourly"> <p className="mb-0 p-0"> {timelocal.getHours() + index + 1 < 24 ? timelocal.getHours() + index + 1 : timelocal.getHours() + index + 1 -24}:00 </p> </div>
                    <div className="col-2"> <img src={"http://openweathermap.org/img/wn/"+forecast.weather[0].icon+".png"} alt="weather img"/> </div>
                    <div className="col-3 pHourly"> <p id="" className="mb-0"> {(forecast.temp-273.15).toFixed(1) + " °C"} </p> </div>
                    <div className="col-4 pHourly"> <p id="p2divret" className="mb-0 p-0">{(forecast.wind_speed /1000*60*60).toFixed(1)} Km/h</p> </div>
                  </div>
              )
            })
          }
        </div>
      )
    }
    else {
      return
    }
  }

  const rendForecast = () => {
    if(dailyForecast.length!==0){
        return(
          <div className="mb-1">
            <div className='row mb-3'>
              <div className='col'> <button onClick={()=>{setActivedaily(true); setActivehourly(false)}} id="btndaily"> <p id="pforecasttitle" className="m-1">Daily forecast</p> </button> </div>
              <div className='col text-end'> <button onClick={()=>{setActivedaily(false); setActivehourly(true)}} id="btnhourly"> <p id="pforecasttitle" className="m-1">Hourly forecast</p> </button> </div>
            </div>
            {rend()}
          </div>
        )
    }
  }

  const handleClose = () => {
    setDeleteCard(true)
  }

  return(
    <div id="divprincipal" className="col-md-4 mx-md-3 mb-4 p-4 pb-1">
      <Card setDaily={setDailyForecast} setHourlyForecast={setHourlyForecast} setTime={setTimelocal} days={days} months={months}/>
      {rendForecast()}
      <div className="w-100 m-0 text-center" id="divClosebtn">
        <button onClick={handleClose} id="closeBtn"> remove </button>
      </div>
    </div>
  )
}

export default memo(Extended)
