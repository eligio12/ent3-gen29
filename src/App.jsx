import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {
  const [inputValue, setInputValue] = useState(getRandomNumber(126))


  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'hola'}`
  const [location, getLocation, hasError, isLoading] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }


  // console.log(location)

  return (
    <div className='principal'>
      <img className='img_header' src="/header.jpg" alt="Header img" />
      <div className='input_box'>
        <form onSubmit={handleSubmit}>
          <input ref={inputSearch} type="text" />
          <button>Search</button>
        </form>
      </div>
      {
        isLoading
          ? <h2 className='loading'>Loading...</h2>
          : (
            hasError
              ? <h2 className='error'>❌ Hey! you must provide an id from 1 to 126 😭</h2>
              : (
                <>
                  <LocationInfo 
                    location={location}
                  />
                  <div className='residents'>
                    {
                      location?.residents.map(url => (
                        <ResidentCard 
                          key={url}
                          url={url}
                        />
                      )) 
                    }
                  </div>
                </>
              )
          )
        
      }
    </div>
  )
}

export default App
