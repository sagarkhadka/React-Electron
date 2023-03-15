import { useEffect, useState } from 'react'
import '@/style/App.scss'
import { WEATHER_API_KEY, BASE_URL } from '@/constant/config'
import axios from 'axios'

import { MdOutlineWaterDrop } from 'react-icons/md'
import { BsThermometerLow } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { TiLocationArrowOutline, TiWeatherCloudy, TiWeatherWindy, TiWeatherShower, TiWeatherSnow, TiWeatherSunny, TiWeatherWindyCloudy } from 'react-icons/ti'

// console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

interface Weather {
  main: {
    feels_like: number
    temp: number
    humidity: number
    pressure: number
    temp_max: number
    temp_min: number
  }

  weather: {
    description: string
    main: string
  }[]

  wind: {
    speed: number
  }

  currentWeather: number
  name: string
}

function App() {
  const [weatherData, setWeatherData] = useState<Weather>()
  const [cityName, setCityName] = useState<string>('kathmandu')
  // const city = 'kathmandu,np'
  const fetchData = async (city?: string) => {
    try {
      const res: any = await axios.get(`${BASE_URL}/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}`)
      setWeatherData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    fetchData(cityName)
  }

  useEffect(() => {
    fetchData(cityName)
  }, [])

  // console.log(weatherData)

  // console.log(cityName)
  // console.log(weatherData?.weather?.main)

  return (
    <>
      <main className='weather'>
        <div className='input-place'>
          <input
            type='text'
            name='city'
            id='city'
            onChange={(event) => setCityName(event.target.value)}
            value={cityName}
            className='input-city'
          />
          <button
            className='submit-button'
            onClick={handleClick}
          >
            <FiSearch
              color={'#1f1f1f'}
              size={20}
            />
          </button>
        </div>

        {weatherData?.name != undefined ? (
          <>
            <div className='top-section'>
              <div className='location'>
                <div className='city'>
                  <TiLocationArrowOutline size={28} />
                  <h3>{weatherData?.name}</h3>
                </div>
                <h1>
                  {weatherData?.main?.temp.toFixed()}
                  &#xb0;C
                </h1>
              </div>
              <div className='details'>
                <div className='texts'>
                  <h4>{weatherData?.weather[0]?.description}</h4>
                  <div className='temp'>
                    <span className='min-temp'>min: {weatherData?.main?.temp_min.toFixed()}</span>
                    <span className='max-temp'>max: {weatherData?.main?.temp_max.toFixed()}</span>
                  </div>
                </div>
                <div className='icon'>
                  {weatherData?.weather[0]?.main === 'Rain' ? <TiWeatherShower size={100} /> : null}
                  {weatherData?.weather[0]?.main === 'Clouds' ? <TiWeatherCloudy size={100} /> : null}
                  {weatherData?.weather[0]?.main === 'Snow' ? <TiWeatherSnow size={100} /> : null}
                  {weatherData?.weather[0]?.main === 'Clear' ? <TiWeatherSunny size={100} /> : null}
                  {weatherData?.weather[0]?.main === 'Rain' ? <TiWeatherWindyCloudy size={100} /> : null}
                </div>
              </div>
            </div>

            <div className='other-info'>
              <div className='info feels-like'>
                <h2>
                  {weatherData?.main?.feels_like.toFixed()}
                  <small>&#xb0;C</small>
                </h2>
                <div className='icon'>
                  <BsThermometerLow size={20} />
                  <h3>Feels Like</h3>
                </div>
              </div>

              <div className='info humidity'>
                <h2>
                  {weatherData?.main?.humidity}
                  <small>%</small>
                </h2>
                <div className='icon'>
                  <MdOutlineWaterDrop size={20} />
                  <h3>Humidity</h3>
                </div>
              </div>

              <div className='info wind-speed'>
                <h2>
                  {weatherData?.wind?.speed}
                  <small>MPH</small>
                </h2>
                <div className='icon'>
                  <TiWeatherWindy size={24} />
                  <h3>Wind Speed</h3>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h4>Place not found</h4>
          </>
        )}
      </main>
    </>
  )
}

export default App
