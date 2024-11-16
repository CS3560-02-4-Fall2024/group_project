function DentistCreateAcc() {

  return (
    <>
      {/*Background*/}
      <div class="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div class="w-1/3 h-3/4 bg-g rounded-3xl flex justify-center">
          <div class="">
            {/*Title of Page*/}
            <div class="text-white text-center text-3xl font-bold mt-10">
              <p>Create Dentist Account</p>
            </div>
            {/*Name Text*/}
            <div class="text-white text-xl mt-4 ml-2 mb-1">
              Name
            </div>
            {/*Name Input Field*/}
            <div class="flex items-center justify-center">
              <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Dentist Type Text*/}
            <div class="text-white text-xl mt-3 ml-2 mb-1">
              Dentist Type
            </div>
            {/*Dentist Type InputField*/}
            <div class="flex items-center justify-center">
              <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Password Text*/}
            <div class="text-white text-xl mt-3 ml-2 mb-1">
              Password
            </div>
            {/*Password Input Field*/}
            <div class="flex items-center justify-center">
              <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Create Account Button*/}
            <div class="flex items-center justify-center mt-10">
              <button class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Create Account
              </button>
            </div>
            {/*Don't Have an Account*/}
            <div class="flex items-center justify-center mt-10 text-white">
              <button class="hover:text-[#587354]">
                <p>Sike! I have an Account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistCreateAcc
