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
    const PLACEHOLDER_IMG = `${imagesPath}placeholder.png`;
    const LOGO = `${imagesPath}logo.jpg`;

    const value = { 
        globalInfo,
        PLACEHOLDER_IMG,
        LOGO
    };

    return (
        <MainDataContext.Provider value={value}>
            { children }
        </MainDataContext.Provider>
    );
};

export { MainDataContext, MainDataProvider };