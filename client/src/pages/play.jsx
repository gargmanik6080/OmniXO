import Board from "../components/boardComp"
import { NavLink } from "react-router-dom";
const Play = () => {

    return (
        <div>
            {/* <Board squares={["x", "x", "O","x", "x", "O","x", "x", "O"]}  /> */}
            <NavLink to="/board">
                <h1>Play</h1>
            </NavLink>
            
        </div>
    )
}

export default Play
