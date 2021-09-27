import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function Authenticated({Component}) {
    const {currentUser} = useSelector(state => state.userLogin)
    if (currentUser) return <Component />
    else return <Redirect to="/login" />
}

export default Authenticated
