"use server"

export async function getData(skip:number) {
  try{
   const res = await fetch(`http://localhost:3001/question?skip=${skip}`)
   const data=await res.json()
   if (!res.ok) {
     throw new Error('Məlumat alınarkən xəta yarandı')
   }
  
   return data
  }catch(error){
   return error
  }
 }