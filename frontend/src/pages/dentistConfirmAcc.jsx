function DentistConfirmAcc() {

  return (
    <>
      {/*Background*/}
      <div class="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div class="w-1/3 h-1/2 bg-g rounded-3xl flex justify-center items-center">
          <div>
            {/*Title Text*/}
            <div class="text-center text-white text-4xl font-bold">
              <p>Thank you for</p>
              <p>Creating an Account!</p>
            </div>
            {/*More Text*/}
            <div class="text-center text-white text-4xl font-bold mt-10">
              <p>Your Dentist ID is:</p>
              {/*Dentist ID Variable*/}
              <p class="underline">0001</p>
            </div>
            {/*Go back to login button*/}
            <div class="flex items-center justify-center mt-10">
                <button class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  Go To Login
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistConfirmAcc
