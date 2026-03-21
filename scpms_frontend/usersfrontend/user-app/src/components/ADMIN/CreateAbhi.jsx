import { useEffect } from "react";
import { CreateAdAbhi } from "../apis";

function CreateAbhi(){

        const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;
  const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI;

    const getAdmin=async()=>{
        try{
 const response = await CreateAdAbhi();
            console.log("check ABHI",response)
        }catch(error){
            console.log("UNABLE TO GET ABI",error.message)
        }
    }
useEffect(()=>{
    getAdmin();
},[])

    return(
        <>
        <h1>ABHI CREATED</h1>
        </>
    )
}
export default CreateAbhi;