import React, { Fragment } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <Fragment>
        <h1 className="x-large text-primary">
            <FaExclamationTriangle/>{' '}
            404 - Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exists.</p>
    </Fragment>
  )
}

export default NotFound