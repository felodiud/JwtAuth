import { useContext } from "react"
import { Context } from "../../store/context"
import { img } from "../../imgs/img"
import { useNavigate } from "react-router-dom"


export const Navbar = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }
    
    
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="d-flex container-fluid justify-content-between">
            <a className="navbar-brand" href="#">Navbar</a>
            {store.token && store.token !== undefined && store.token !== "" ? ( 
            <div>
                <button className="btn btn-primary me-2" type="submit" onClick={actions.logout}>Log out</button>
                <img src={img} className="rounded-circle" alt="User Image"  style={{height: 45}}/>

            </div>) :
        (<button className="btn btn-outline-success" type="submit" onClick={handleLogin}>Log in</button>)

            }
        </div>
    </nav>
    )
}