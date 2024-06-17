import { createSlice } from "@reduxjs/toolkit";

interface initialStateType{
    skip:number,
    correctAnswers:number,
}

const initialState:initialStateType={
skip:0,
correctAnswers:0,
}
export const dataSlice=createSlice({
    name:"dataSlice",
    initialState,
    reducers:{
        //Skip dəyəri artır və dəyər dəyisildikdə getData funksiyası işə düşərək api-dən növbəti sualı gətirir
nextQuestion:(state)=>{
    state.skip=state.skip+1;
},
// Istifadəçi seçimi doğru olduqda düzgün cavabların sayını artıran funksiya
increaseCorrectAnswer:(state)=>{
state.correctAnswers=state.correctAnswers+1;
},
//Skip dəyərini sıfırlayaraq Quizi yenidən başladan funksiya.
retake:(state)=>{
    state.skip=0
}
    }
})

export const {nextQuestion,increaseCorrectAnswer,retake}=dataSlice.actions
export default dataSlice.reducer