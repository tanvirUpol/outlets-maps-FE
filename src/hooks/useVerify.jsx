import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useVerify = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const verify = async (email, verificationCode) => {
    console.log(email, verificationCode); 
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${api_url}/user/verify`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify( {email, verificationCode})
      
    })


    // console.log(JSON.stringify({ staffId, password }));
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { verify, isLoading, error }
}