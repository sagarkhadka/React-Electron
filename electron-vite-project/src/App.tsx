import { useEffect, useState } from 'react'
import './App.scss'
import Client from '@/API/Client'
import { WEATHER_API_KEY, BASE_URL } from "@/constant/config";
import axios from 'axios'

// console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const city = 'kathmandu,np'
  useEffect(() => { 
    const fetchData =async () => {
      try {
        // const res = await axios.get(`${BASE_URL}/data/2.5/weather?q=${city},${country}&APPID=${WEATHER_API_KEY}`)
        const res: any = await axios.get(`${BASE_URL}/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}`)
        setWeatherData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  console.log(weatherData)
  return (
    <>
      <main>
        <h3>hello</h3>
      </main>
    </>
  )
}

export default App
