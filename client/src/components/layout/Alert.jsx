import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alerts = useSelector(state => state.alerts)

    if(alerts !== null && alerts.length > 0){
        return alerts.map(alt=>(
            <div key={alt.id} className= {`alert alert-${alt.alertType}`}>
                {alt.msg}
            </div>
        ))
    }
    return null
  
}

export default Alert