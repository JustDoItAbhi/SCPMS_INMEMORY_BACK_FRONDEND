import { useEffect } from "react";

function CreateAbhi(){
    const getAdmin=async()=>{
        try{
            const abhi=await CreateAdAbhi();
            console.log("check ABHI",abhi)
        }catch(error){
            console.log("UNABLE TO GET ABI",error.message)
        }
    }
useEffect(()=>{
    abhi();
},[])

    return(
        <>
        <h1>ABHI CREATED</h1>
        </>
    )
}