// context/AppContextProvider.jsx
import { AppContext } from './AppContext';
import { useState } from 'react';

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const [myData, setMydata] = useState({});

    const value = {
        backendUrl,
        myData,
        setMydata,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
