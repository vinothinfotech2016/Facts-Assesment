import React, { useEffect } from 'react'

function initial() {

    useEffect(() => {
     
        const userData = JSON.parse(localStorage.getItem)("user")
        console.log(userData);


    }, [])
    


  return (
    <>
    
    
    </>
  )
}

export default initial