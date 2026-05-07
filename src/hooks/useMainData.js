import { useContext } from 'react';
import { MainDataContext } from '../contexts/MainDataContext.jsx';

const useMainData = () => {
    const context = useContext(MainDataContext);

    if (!context) throw new Error('useMainData must be used within an AuthProvider');

    return context;
};
export default useMainData;