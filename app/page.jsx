"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
import axios from "axios";
import {URL} from './globalLink'
import {useRouter} from 'next/navigation'



const inter = Inter({ subsets: ["latin"] });

const signUpInitialState = {
  userName: "",
  userEmail: "",
  userPhone:"",
  userPass: "",
};

const loginInitialState = {
  userEmailPhone :"",
  userPass:""
}

export default function Home() {
  const router = useRouter()
  const [initialForm, setForm] = useState(true)
  const [signUp, setSignUp] = useState(signUpInitialState);
  const [login,setLogin] = useState(loginInitialState)

  //function
  const onInputChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  
  //set login info
  const onInputLogin = (e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
  }

  //submit signup form 
  const submitSignUpForm = async() => {
    console.log(signUp)
    const formSubmitSignUp = await axios.post(`${URL.preLink}/auth/signup`,signUp,{withCredentials:true}).then((response)=>{
    console.log(response.data)
    alert(response.data.message)
    

    })
  };

  //submit login form
  const submitLoginForm = async()=>{
    console.log(login)
    const formSubmitLogin = await axios.post(`${URL.preLink}/auth/login`,login,{withCredentials:true}).then((response)=>{
    console.log(response.data)
    localStorage.setItem('c_personal_record_user',JSON.stringify(response.data.data._id))
    
    router.push('/dashboard')

    })
    
  }


  const setFormRev = () => {
    setForm(!initialForm)
  }

  return (
    <>
      {
        initialForm ?
          <section class="h-screen">
            <div class="px-6 h-full text-gray-800">
              <div
                class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
              >
                <div
                  class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="w-full"
                    alt="Sample image"
                  />
                </div>
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

                  <form>
                    <div class="mb-6 form-floating">
                      <input type="text" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="user name" name="userName" onChange={(e) => onInputChange(e)} />
                      <label for="floatingInput" class="text-gray-700">User Name</label>
                    </div>
                    <div class="mb-6 form-floating">
                      <input type="email" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com" name="userEmail" onChange={(e) => onInputChange(e)} />
                      <label for="floatingInput" class="text-gray-700">Email address</label>
                    </div>
                    <div class="mb-6 form-floating">
                      <input type="email" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com" name="userPhone" onChange={(e) => onInputChange(e)} />
                      <label for="floatingInput" class="text-gray-700">Phone Number</label>
                    </div>

                    <div class="mb-6 form-floating">
                      <input type="password" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com" name="userPass" onChange={(e) => onInputChange(e)} />
                      <label for="floatingInput" class="text-gray-700">Password</label>
                    </div>

                    <div class="flex justify-between items-center mb-6">

                      <a href="#!" class="text-gray-800">Forgot password?</a>
                    </div>

                    <div class="text-center lg:text-left">
                      <button
                        type="button"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => submitSignUpForm()}
                      >
                        Sign Up
                      </button>
                      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                        Already have an account?
                        <a
                          href="#!"
                          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                          onClick={setFormRev}
                        >Login</a
                        >
                      </p>
                    </div>
                  </form>







                </div>
              </div>
            </div>
          </section>
          :
          <section class="h-screen">
            <div class="px-6 h-full text-gray-800">
              <div
                class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
              >
                <div
                  class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="w-full"
                    alt="Sample image"
                  />
                </div>
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">



                  <form>

                    <div class="mb-6 form-floating">
                      <input type="email" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com" name="userEmailPhone" onChange={(e) => onInputLogin(e)} />
                      <label for="floatingInput" class="text-gray-700">Email or Phone number</label>
                    </div>


                    <div class="mb-6 form-floating">
                      <input type="password" class="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com" name="userPass" onChange={(e) => onInputLogin(e)} />
                      <label for="floatingInput" class="text-gray-700">Password</label>
                    </div>

                    <div class="flex justify-between items-center mb-6">

                      <a href="#!" class="text-gray-800">Forgot password?</a>
                    </div>

                    <div class="text-center lg:text-left">
                      <button
                        type="button"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => submitLoginForm()}
                      >
                        Login
                      </button>
                      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <a
                          href="#!"
                          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                          onClick={() => setFormRev()}
                        >Sign Up</a
                        >
                      </p>
                    </div>
                  </form>





                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
}
