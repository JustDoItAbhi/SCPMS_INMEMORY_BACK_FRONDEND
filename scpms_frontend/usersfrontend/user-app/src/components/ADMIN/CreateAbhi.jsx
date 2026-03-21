import { useEffect } from "react";
import { CreateAdAbhi } from "../apis";

function CreateAbhi(){
    const getAdmin=async()=>{
        try{
            const abhi=await CreateAdAbhi();
            console.log("check ABHI",abhi)
        }catch(error){
            console.log("UNABLE TO GET ABI",error.message)
        }
    }
// useEffect(()=>{
//     getAdmin();
// },[])

    return(
        <>
        <h1>ABHI CREATED</h1>
        </>
    )
}
export default CreateAbhi;