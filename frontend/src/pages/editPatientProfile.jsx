import NavBar from '../components/Navbar';

function EditPatientProfile() {

  return (
    <>
      {/*Background*/}
      <div class="w-[100vw] h-[100vh] bg-dg">
        <NavBar />
        <div class="">
          {/*Light Green Block*/}
          <div class="w-1/2 h-3/4 bg-g rounded-3xl flex justify-center mt-20">
            <div class="">
              {/*Title of Page*/}
              <div class="text-white text-center text-3xl font-bold mt-10">
                <p>Create Dentist Account</p>
              </div>
              {/*1st line of inputs*/}
              <div class="flex justify-center">
                <div class="mx-4">
                  {/*Name Text*/}
                  <div class="text-white text-xl mt-4 ml-2 mb-1">
                    Name
                  </div>
                  {/*Name Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div class="mx-4">
                  {/*Password Text*/}
                  <div class="text-white text-xl mt-4 ml-2 mb-1">
                    Password
                  </div>
                  {/*Name Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*2nd line of inputs*/}
              <div class="flex justify-center">
                <div class="mx-4">
                  {/*Email Address Text*/}
                  <div class="text-white text-xl mt-2 ml-2 mb-1">
                    Email Address
                  </div>
                  {/*Email Address Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div class="mx-4">
                  {/*Phone Number Text*/}
                  <div class="text-white text-xl mt-2 ml-2 mb-1">
                    Phone Number
                  </div>
                  {/*Phone Number Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*3rd line of inputs*/}
              <div class="flex">
                <div class="mx-4">
                  {/*Date of Birth Text*/}
                  <div class="text-white text-xl mt-2 ml-2 mb-1">
                    Date of Birth
                  </div>
                  {/*Date of Birth Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div class="mx-4">
                  {/*Insurance Company Text*/}
                  <div class="text-white text-xl mt-2 ml-2 mb-1">
                    Insurance Company
                  </div>
                  {/*Insurance Company Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*4th line of inputs*/}
              <div class="flex">
                <div class="mx-4">
                  {/*Address Text*/}
                  <div class="text-white text-xl mt-2 ml-2 mb-1">
                    Address
                  </div>
                  {/*Address Input Field*/}
                  <div class="flex items-center justify-center">
                    <input class="p-2 w-96 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*Create Account Button*/}
              <div class="flex items-center justify-center mt-10">
                <button class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  Create Account
                </button>
              </div>
              {/*Don't Have an Account*/}
              <div class="flex items-center justify-center mt-5 text-white">
                <button class="hover:text-[#587354]">
                  <p>Sike! I have an Account</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default EditPatientProfile
  