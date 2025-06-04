import React, { useState, useEffect }  from 'react'
import PopUpQuiz from '../Components/PopUpQuiz'

const QuizPage = () => {

    const [timeLeft, setTimeLeft] = useState(30); // Initial time is 30 seconds

    useEffect(() => {
        // Exit early if the timer reaches 0
        if (timeLeft === 0) {
            // You can add logic here for when the timer finishes
            console.log("Time's up!");
            return;
        }

        // Set up the timer interval
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
        }, 1000);

        // Clean up the interval on component unmount or when timeLeft changes
        return () => clearInterval(timerId);
    }, [timeLeft]); // Re-run the effect when timeLeft changes
    return (
        <>
            <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed  min-h-screen w-screen justify-items-center px-5 pt-7 md:pt-10">


                <PopUpQuiz />
            </div>
        </>
    )
}

export default QuizPage
