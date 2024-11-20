import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const Logout = () => {
        navigate("/")
    }

    return (<div className="h-[12vh] w-[100vw] bg-g float-left ml-0 pl-0 flex justify-center">
        <p className="self-center justify-self-end font-mono font-bold text-6xl ml-auto -mr-36 text-white">Shiny Teeth and Me</p>
        <button onClick={Logout} className="w-36 h-1/2 bg-dg hover:bg-[#587354] self-center justify-self-end ml-auto mr-3.5 rounded-md text-white font-bold text-2xl">Logout</button>
    </div>)
}

export default Navbar;