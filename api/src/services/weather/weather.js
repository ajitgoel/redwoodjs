import fetch from 'node-fetch'

export const getWeather = async ({ zip }) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=70c39b2152d55e90a12777dd64b0d118`
  )
  const json = await response.json()
  if (json.cod === '404') {
    return new Error(`${zip} isn't a valid US zip code, please try again`)
  }
  return {
    zip,
    city: json.name,
    conditions: json.weather[0].main,
    temp: Math.round(((json.main.temp - 273.15) * 9) / 5 + 32),
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
  }
}
