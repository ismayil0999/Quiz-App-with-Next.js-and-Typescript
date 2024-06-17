"use client"
import QuestionLayout from "./QuestionLayout"
import { useEffect,useState } from "react"
import { getData } from "@/lib/getData"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { nextQuestion, increaseCorrectAnswer,retake } from "@/redux/slice"

function HomePage() {
  const [questions, setQuestions] = useState<any>(null)
  const [total,setTotal]=useState<number>(0)
  const [userChoice,setUserChoice]=useState<string | null>(null)
  const [finish,setFinish]=useState<boolean>(false)
  const { skip } = useSelector((state: RootState) => state.dataSlice)
  const { correctAnswers } = useSelector((state: RootState) => state.dataSlice)
  const dispatch = useDispatch()

  useEffect(() => {
     //Skip dəyərini parametr olaraq ötürərək APİ-dən neçənci sualın gətirələciyini bildiririk
    getData(skip).then((data) => {
      setQuestions(data)
      setTotal(data.totalQuestions)
    })
  }, [skip])

  const handleClick = async () => {
     //Əgər istifadəçi seçim edibsə və əgər skip dəyəri databazada olan sual sayından azdırsa skip dəyəri artır və APİ-yə sorğu atılaraq növbəti sual alınır
    if(userChoice && skip<total-1){
      setQuestions(null)
      setUserChoice(null)
      //Skip dəyərini artırır və skip dəyəri dəyişdikdə getData funksiyası çağırılaraq apiye istə atılır
      dispatch(nextQuestion());
      if (userChoice === questions.question.answer) {
         //İstifadəçi seçdiyi cavab doğrudursa düzgün cavabların sayını artırmaq üçün
        dispatch(increaseCorrectAnswer())
  
    } 
     }else{
  //Əgər heçbir cavab seçilmədən Next butonu klik olunarsa ekranda bildirim göstərmək üçün
  if(skip!=total-1){
    alert("Please choose one answer")
  }else{
     //Sonuncu suala çatdıqda finish dəyəri true olur və ekranda nəticə görsənir
   setFinish(true)
  }
     }
  };

  //Quiz yenidən başladılması üçün
const reset=()=>{
  dispatch(retake())
  setFinish(false)
}

 //Sonuncu sual olduqda ekranda nəticələrin göstərilməsi üçün
  if(finish===true){
   if(correctAnswers<5){
    return <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-[20px]">
      <h1 className="text-red-600 text-4xl text-center text font-bold">Your result is bad</h1>
      <p>Total questions: {total}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <button onClick={reset} className="bg-orange-500 p-[5px] text-white rounded-[5px] w-[150px]">Retake quiz</button>
    </div>
   }else{
    return <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-[20px]">
      <h1 className="text-green-600 text-4xl text font-bold">Your result is good</h1>
      <p>Total questions: {total}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <button onClick={reset} className="bg-orange-500 p-[5px] text-white rounded-[5px] w-[150px]">Retake quiz</button>
    </div>
   }
  }
  

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-[30px]">
      {questions && <QuestionLayout
        question={questions.question.question}
        options={questions.question.options}
        setChoice={setUserChoice}
      />}
      {questions && <button onClick={handleClick} className="bg-black text-white border-2 border-gray-200 w-[250px] p-[5px] font-bold">{skip===total-1 ? "Finish" : "Next"}</button>}
      {/*API atılan istək pending olduğu zaman ekranda loader göstərir */}
      {!questions && <div className="loader"></div>}
    </div>
  )
}
export default HomePage