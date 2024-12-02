import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(sessionStorage.getItem("email") + " dentistId: " + sessionStorage.getItem("id") + " authToken: " + sessionStorage.getItem("authToken"));
        const storedEmail = sessionStorage.getItem("email");
        const storedId = sessionStorage.getItem("id");
        if ( (storedEmail === 'undefined' || storedEmail === "" || storedEmail === null) && (storedId === 'undefined' || storedId === "" || storedId === null) ) {
            navigate("/");
        }
    }, []);

    const Logout = () => {
        sessionStorage.clear();
        navigate("/");
    }

    return (<div className="h-[12vh] w-[100vw] bg-g float-left ml-0 pl-0 flex justify-center">
        <p className="self-center justify-self-end font-mono font-bold text-[3.1vw] ml-auto -mr-36 text-white">Shiny Teeth and Me</p>
        <button onClick={Logout} className="w-[7.5vw] h-1/2 bg-dg hover:bg-[#587354] self-center justify-self-end ml-auto mr-3.5 rounded-md text-white font-bold text-[1.18vw]">Logout</button>
    </div>)
}

export default Navbar;