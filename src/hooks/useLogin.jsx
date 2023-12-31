import { useState } from 'react'


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const { dispatch } = useAuthContext()
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const login = async (email, password) => {
    // console.log(staffId,password); 
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${api_url}/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify( {email, password})
      
    })


    // console.log(JSON.stringify({ staffId, password }));
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      return false
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('verify', JSON.stringify(json))

      
      
      // update the auth context
      // dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
      
      

    }
  }

  return { login, isLoading, error }
}