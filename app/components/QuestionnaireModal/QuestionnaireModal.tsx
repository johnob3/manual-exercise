'use client'
import {useState, useEffect} from 'react';
import Image from 'next/image';
// import useSWR from 'swr';
import api from "./api.json";
import styles from './QuestionnaireModal.module.scss';
// const fetcher = url => fetch(url, {mode: "no-cors"}).then(r => r.json())

const QuestionnaireModal = ({isOpen, onClose}) => {
    // const {data: questions, error} = useSWR(
    //     isOpen ? 'https://manual-case-study.herokuapp.com/questionnaires/972423.json' : null, //
    //     fetcher
    // );

    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState('');
    const [questions, setQuestions] = useState([])
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Reset answers and result when the modal opens
        if (isOpen) {
            setAnswers({});
            setCurrentStep(0);
            setResult(null);
        }
        setQuestions(api['questions']);

    }, [isOpen]);

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers((prevAnswers) => ({...prevAnswers, [questionIndex]: answer}));

        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleGoBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleModalClose = () => {
        setAnswers({});
        setCurrentStep(0);
        setResult(null);
        onClose();
    };

    const handleSubmit = () => {
        // Check if any selected option has isRejection set to true
        const hasRejection = questions.some((question, index) => {
            const selectedAnswer = answers[index];
            return (
                selectedAnswer &&
                question.options[selectedAnswer].isRejection
            );
        });

        setResult(hasRejection ? "Unfortunately, we are unable to prescribe this medication for you" : "You're eligible for prescription!");
    };

    return (
        <div style={{display: isOpen ? 'block' : 'none'}} className={styles.questionnaire}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={handleModalClose}>
                        <Image src={"/assets/close.png"} width={40} height={40} alt="close"/>
                    </button>
                </div>
                {questions.map((question, index) => (
                    index === currentStep && (
                        <div key={index}>
                            <h2 className={styles.question}>{question.question}</h2>
                            <div className={styles.questionOptions}>
                                {question.options.map((option, optionIndex) => (
                                    <label key={optionIndex}>
                                        <input
                                            type={question.type === 'ChoiceType' ? 'radio' : 'checkbox'}
                                            name={`question_${index}`}
                                            value={optionIndex}
                                            checked={answers[index] === optionIndex}
                                            onChange={() => handleAnswerChange(index, optionIndex)}
                                        />
                                        <div dangerouslySetInnerHTML={{__html: option.display}}/>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )
                ))}
                <div className={styles.controls}>

                {(result && currentStep >= questions.length) && <p className={styles.result}>{result}</p>}
                {currentStep > 0 && (
                    <button className={styles.backBtn} disabled={currentStep > answers.length + 1} onClick={handleGoBack}>Go Back</button>
                )}
                </div>
            </div>
        </div>
    );
};

export default QuestionnaireModal;
