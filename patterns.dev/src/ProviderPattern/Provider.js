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
