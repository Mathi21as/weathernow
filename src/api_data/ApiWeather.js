const apiId = "b8009518fe7904f2681f3896df83d8bf"
const apiWeather = (dat, setWeather) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${parseFloat(dat.lat)}&lon=${parseFloat(dat.lon)}&appid=${apiId}`)
    .then(res => res.json())
    .then(data => setWeather(data))
}

const apiCity = (search, setCities) => {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiId}`)
    .then(res => res.json())
    .then(data => setCities(data))
}

export { apiWeather, apiCity }
