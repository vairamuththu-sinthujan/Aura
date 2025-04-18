import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import VerifyComponent from '../components/VerifyComponent';

const AccVerify = () => {
    const {user} = useParams();
    const {myData} = useContext(AppContext);





    if(user != myData.name){
        return <PageNotFoundComponent/>
    }
    else {
        return (
            <div>
                <VerifyComponent/>
            </div>
          )
    }

}

export default AccVerify