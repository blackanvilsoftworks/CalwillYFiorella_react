import { createContext } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const globalInfo = {
        name        : 'Calwill & Fiorella',
        phoneNumber : '+54 9 11-5959-0586',
        email       : 'calwillyfiorella@gmail.com',
        web         : 'https://calwillyfiorella.com'
    };
    
    const imagesPath = '/assets/images/';
    const placeholder = '/assets/images/placeholder.png';

    const value = { 
        globalInfo, 
        imagesPath,
        placeholder
    };

    return (
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };