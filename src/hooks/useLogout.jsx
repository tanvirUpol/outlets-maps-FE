import { useAuthContext } from "./useAuthContext"
// import { useWorkoutContext } from "./useWorkoutContext"
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    // const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        localStorage.removeItem('outlets')
        localStorage.removeItem('verify')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        // workoutDispatch({type: 'SET_WORKOUTS',payload: null} )
    }

    return {logout}

}
