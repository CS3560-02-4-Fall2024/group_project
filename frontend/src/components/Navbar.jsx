
function Navbar() {

    const Logout = () => {
        console.log("logout the thang");
    }

    return (<div className="h-[12vh] w-[100vw] bg-g float-left ml-0 pl-0 flex justify-center">
        <p className="self-center justify-self-end font-mono font-bold text-6xl ml-auto -mr-36 text-white">Shiny Teeth and Me</p>
        <button onClick={Logout} className="border-2 border-solid border-black w-36 h-1/2 bg-dg hover:bg-[#587354] self-center justify-self-end ml-auto mr-3.5 rounded-md text-white font-mono text-2xl">Logout</button>
    </div>)
}

export default Navbar;