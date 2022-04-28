## Design Patterns with JavaScript and React

Notes from https://www.patterns.dev/ 

#### Singleton

**Share a single global instance throughout our application**

Singletons are classes that can be instanciated once, and can be accessed globally.

#### Proxy Pattern

Share a global instance throughout our application.

With a Proxy object we get more controll over the interactions with certain objects.

Proxy = Stand-in for someone else.

A proxy can be useful for adding validation.

###### Reflect

JavaScript provides a built-in object called Reflect.

**From**

```
obj[prop] = value;
```

**To**

```
Reflect.set(obj, prop, value);
```

#### Provider Pattern

**Make data available to multiple child components**

Avoid prop drilling.

Make data available to multiple components.

Wrap all components in a Provider.

Provider is a higher-order component provided to us by the Context object.

Each component get access to the data by using the UseContext hook.



```
import React, {createContext, useContext} from 'react'
const DataContext = createContext();

const Provider = () => {
    const data = {
        text: "My text"
    }
    return (
        <div>
        <DataContext.Provider value={data}>
        <Text />
        </DataContext.Provider >            
        </div>
    )
}

const Text = () => {
    const {text} = useContext(DataContext);
    return <h1>{text}</h1>
}
export default Provider
```

#### Prototype Pattern

**Share properties among many objects of the same type**

```
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        return "Voff!!";
    }
}

Dog.prototype.play = () => console.log("Playing!!");
```

###### Object create

```
const dog = {
    bark() {
        return "Voff!!"
    }
}

const pet1 = Object.create(dog);
```

#### Container / Presentational Pattern

**Enforce separation of concerns by separating the view from the application logic**

1. Presentational Components: Components that care about **how** data is shown to the user.xx
2. Container Components: Components that care about **what** data is shown to the user.

The Container/Presentational Pattern can be replaced with Hooks.

```
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
```

#### Observer Pattern





