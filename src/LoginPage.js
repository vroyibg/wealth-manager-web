import React from "react";
import {Formik} from "formik";
import {AuthenticationContext} from "./App";
import {Redirect} from "react-router-dom";
import {GetToken, SaveToken} from "./Jwt";
import {getEndpoint} from "./api";

const LoginPage = () => {
  const [authentication, setAuthentication] = React.useState({})
  if (!authentication.token) {
    const token = GetToken()
    if (token) {
      setAuthentication({token})
    }
  }

  if (authentication.token) {
     return <Redirect to="/"/>
  }

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{userName: '', password: ''}}
        validate={values => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Required';
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          fetch(`${getEndpoint()}/authentication`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
          }).then(r => {
            if (r.status === 400) {
              setErrors({userName: "Username or password invalid "})
              setSubmitting(false)
            } else if (r.status !== 200) {
              setErrors({userName: "there is an error"})
              setSubmitting(false)
            } else {
              r.json().then(data => {
                SaveToken(data.token)
                setAuthentication(data);
                setSubmitting(false)
              })
            }
          }).catch(() => {
            setErrors({userName: "there is an error"})
            setSubmitting(false)
          });
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
            />
            {errors.userName && touched.userName && errors.userName}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
