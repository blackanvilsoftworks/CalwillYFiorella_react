import { createContext } from "react";

const MainDataContext = createContext();

const MainDataProvider = ({ children }) => {

    const globalInfo = {
        name        : 'Calwill & Fiorella',
        phoneNumber : '+54 9 11-5959-0586',
        email       : 'calwillyfiorella@gmail.com',
        web         : 'https://calwillyfiorella.com'
    };
    
    const imagesPath = '/assets/images/';

    const value = { 
        globalInfo, 
        imagesPath
    };

    return (
        <MainDataContext.Provider value={value}>
            { children }
        </MainDataContext.Provider>
    );
};

export { MainDataContext, MainDataProvider };