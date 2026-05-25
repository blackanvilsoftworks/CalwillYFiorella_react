import { createContext } from "react";

const MainDataContext = createContext();

const MainDataProvider = ({ children }) => {
    const globalInfo = {
        name: 'Calwill & Fiorella',
        phoneNumber: '+54 9 11-5959-0586',
        email: 'calwillyfiorella@gmail.com',
        web: 'https://calwillyfiorella.com'
    };

    const _IMAGES_PATH = '/assets/images/';
    const PLACEHOLDER_IMG = `${_IMAGES_PATH}placeholder.png`;
    const LOGO = `${_IMAGES_PATH}logo.jpg`;

    const value = {
        globalInfo,
        PLACEHOLDER_IMG,
        LOGO
    };

    return (
        <MainDataContext.Provider value={value}>
            {children}
        </MainDataContext.Provider>
    );
};

export { MainDataContext, MainDataProvider };