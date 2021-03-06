import {AuthenticationContext} from "./App";
import React from "react";
import {Redirect} from "react-router-dom";
import {RemoveToken} from "./Jwt";

const LogoutPage = () => {
  const [authentication, setAuthentication] = React.useContext(AuthenticationContext)
  React.useEffect(() => {
    setAuthentication({token: null})
    RemoveToken()
  }, [])
  if (!authentication.token) {
    return <Redirect to="/login"/>
  } else {
    return <h1>Logging you out</h1>
  }
}

export default LogoutPage
