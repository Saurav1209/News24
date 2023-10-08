import React from 'react'
// import loading from './spinner.gif'
import './spinner.css'
const Spinner=()=> {

    return (
        <div className="text-center container">
          <span className="loader my-3 "></span>
            {/* <img  className="my-3"src={loading} alt="loading" width="200px" height="200px" /> */}

        </div>
      
    )
}

export default Spinner