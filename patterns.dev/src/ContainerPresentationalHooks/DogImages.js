import React, {useState, useEffect} from 'react'

const useDogImages = () => {
    const [dogs, setDogs] = useState([]);

   useEffect(() => {
      async function fecthDogs () {
       const res = await fetch('https://dog.ceo/api/breed/labrador/images/random/6')
       const {message} = await res.json();
       setDogs(message)
      } 

      fecthDogs();
   }, [])
   return dogs; 
}

const DogImages = () => {

    const dogs = useDogImages();
    return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />)
}

export default DogImages
