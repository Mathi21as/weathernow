import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Extended from './components/Extended'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [adds, setAdds] = useState(0) //almacena la cantidad de veces que debe renderizarce extended
  const [extended, setExtended] = useState([])  //almacena el arreglo con la cantidad de extendeds a renderizar

  useEffect(() => {
    for(let i=0;i<adds;i++){
        setExtended([<Extended key={i*adds} keyDel={uuidv4()} delCard={delCard}/>, ...extended])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adds])

  const delCard = (keyDelete) => {
    setExtended((actual)=>actual.filter(el => el.props.keyDel!==keyDelete))
  }

  return (
    <div className="m-0 container mw-100" id="divret">
      <div id="divcont" className="row justify-content-between align-items-center">
        <div className="col-auto">
          <h1 className="m-2">Weather<span>Now</span></h1>
        </div>
        <div className="col-auto">
          <button id="btnApp" className="m-2" onClick={() => setAdds(adds + 1)}>Add +</button>
        </div>
      </div>
      <Layout extended={extended}/>
    </div>
  );
}

export default App;
