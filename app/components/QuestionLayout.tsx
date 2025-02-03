import { useState } from "react";
//Komponentə ötürülən props dəyərlərinin tipini təyin edən interface
interface Quiz {
    question: string,
    options: string[],
    setChoice: (choice: string) => void;
}
function QuestionLayout({ question, options,setChoice}: Quiz) {
const [selectedButton,setSelectedButton]=useState<number | null>(null)

    const handleClick=(option:string,index:number)=>{
       //Burada istifadəçinin seçdiyi cavab Homepage komponentindəki choice state-inə ötürülür və komponent içində seçimin doğru cavab ilə uyğun olub olmadığı yoxlanılır
        setChoice(option)

         //İstifadəçi seçim etdikdə klik olunan elementin index dəyəri selectedButton state-inə ötürülür. Və JSX içində bu dəyər ilə yoxlama edib seçilən elementə border əlavə edirik
        setSelectedButton(index)
    }
    return (
        <div className="w-[80%] h-auto max-[450px]:w-[95%] flex flex-col items-start justify-start gap-[20px]">
            <div className="w-full flex justify-center items-center bg-black text-white h-[50px] rounded-[7px]">
                <h1 className="text-xl font-bold text p-[10px] max-[450px]:text-center">{question}</h1>
            </div>
            <div className="w-full flex flex-col gap-[10px] h-[300px]">
                {options?.map((option, index) => {
                    return <button
                        className={`
                        text
                        text-black
                                w-full
                                h-auto
                                p-[10px] 
                                flex 
                                items-center 
                                bg-white 
                                rounded-[8px] 
                                gap-[20px] 
                                border-2 
                                text-start
                                ${selectedButton===index  ? "border-blue-600" : "border-gray-200"}
                                triangle`}
                                onClick={(e)=>{handleClick(option,index)}}
                                key={index}
                                >
                            {option}
                    </button>
                })}
            </div>
        </div>
    )
}
export default QuestionLayout
