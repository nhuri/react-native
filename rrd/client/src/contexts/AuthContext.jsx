import axios from "axios";
import React,{ createContext, useEffect, useState } from "react";

const baseUrl = "http://localhost:4000/users"

export const AuthContext = createContext();


function AuthProvider({children}){

  const [isAuth,setIsAuth] = useState(false);

  async function getAuth(){
    try {
      const { data } =  await axios.get(`${baseUrl}/auth`,{withCredentials:true});
      console.log(data)
      if(data.success){
        setIsAuth(true)
      }
    } catch (error) {
        console.log(error)
    }
  }

  async function logOut(){
    try {
      const { data } =  await axios.get(`${baseUrl}/logout`,{withCredentials:true});
      console.log(data)
      if(data.success){
        setIsAuth(false)
      }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAuth();
  },[])

  const value = {
    isAuth,setIsAuth,logOut
  }

    return (
    <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
    )
}


export default AuthProvider;