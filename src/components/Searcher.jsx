import {useState} from 'react'
import ShowListCities from './ShowListCities'
import './styles/searcher.css'

const Searcher = ({ infoCity, city }) => {
  const [citie, setCitie] = useState() //guarda la busqueda para enviarla a showlistcities
  const [search, setSearch] = useState()  //guarda la busqueda
  const [flag, setFlag] = useState(false) //controla el retorno de la funcion showListCities

  const handleSubmit = (e) => {
    e.preventDefault()
    setCitie(search)
    setFlag(true)
  }

  const showListCities = () => {
    if(flag){
      return <ShowListCities search={citie} setInfoCity={infoCity} />
    }
  }

 if(city===undefined){
  return (
      <div className="mb-3 mx-3 text-center divsearcher">
        <form  className="pt-2 pb-2 px-3 px-sm-2" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your city" className="mt-1 mb-1 w-sm-100" onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}/>
          <button type="submit" className="m-1">Search</button>
        </form>
        {showListCities()}
      </div>
    )
  }
  else {
    return
  }
}

export default Searcher
