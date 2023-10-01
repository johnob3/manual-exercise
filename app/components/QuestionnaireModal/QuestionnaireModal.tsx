'use client'
import {useState, useEffect} from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import api from "./api.json";
import styles from './QuestionnaireModal.module.scss';

const fetcher = (url: string) => fetch(`https://proxy.cors.sh/${url}`, {
    headers: {
        'x-cors-api-key': 'temp_66d3e936aaa17503c5cc48aa904a3c7c'
    }
}).then(r => r.json())

type Props = {
    isOpen: boolean,
    onClose: () => void
}
const QuestionnaireModal = ({isOpen, onClose}: Props) => {
    const {data: questions, error, isLoading} = useSWR(
        'https://manual-case-study.herokuapp.com/questionnaires/972423.json',
        fetcher
    );

    const [answers, setAnswers] = useState<any[]>([]);
    const [result, setResult] = useState<JSX.Element | null>();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Reset answers and result when the modal opens
        if (isOpen) {
            setAnswers([]);
            setCurrentStep(0);
            setResult(null);
        }

    }, [isOpen]);

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        setAnswers((prevAnswers) => ({...prevAnswers, [questionIndex]: answer}));

        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleGoBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    useEffect(() => {
        if (Object.keys(answers).length === 3) {
            handleSubmit()
            setAnswers([])
        }
    }, [answers, result])

    const handleModalClose = () => {
        setAnswers([]);
        setCurrentStep(0);
        setResult(null);
        onClose();
    };

    const handleSubmit = () => {
        // Check if any selected option has isRejection set to true
        const hasRejection = questions.questions.some((question: any, index: number) => {
            const selectedAnswer = answers[index];
            return (
                selectedAnswer &&
                question.options[selectedAnswer].isRejection
            );
        });

        const positiveResult = (<>Great news! We have the perfect treatment for your hair loss. Proceed to <a
            href="www.manual.co">www.manual.co</a>, and prepare to say hello to your new hair!</>)
        const negativeResult = (<>Unfortunately, we are unable to prescribe this medication for you. This is because
            finasteride can alter the PSA levels, which maybe used to monitor for cancer. You should discuss this
            further with your GP or specialist if you would still like this medication.</>)
        setResult(hasRejection ? positiveResult : negativeResult)
    };

    return (
        <div style={{display: isOpen ? 'block' : 'none'}} className={styles.questionnaire}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={handleModalClose}>
                        <Image src={"/assets/close.png"} width={40} height={40} alt="close"/>
                    </button>
                </div>
                {isLoading && <p>...Loading</p>}
                {questions && questions.questions?.map((question: any, index: number) => (
                    index === currentStep && (
                        <div key={index}>
                            <h2 className={styles.question}>{question.question}</h2>
                            <h6 className={styles.step}>step {currentStep + 1} / {questions.questions?.length}</h6>
                            <div className={styles.questionOptions}>
                                {question.options.map((option: any, optionIndex: number) => (
                                    <label key={optionIndex}>
                                        <input
                                            type={question.type === 'ChoiceType' ? 'radio' : 'checkbox'}
                                            name={`question_${index}`}
                                            value={optionIndex}
                                            checked={answers[index] === optionIndex}
                                            onClick={() => handleAnswerChange(index, optionIndex)}
                                            onChange={() => null}
                                        />
                                        <div dangerouslySetInnerHTML={{__html: option.display}}/>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )
                ))}
                {(result && currentStep >= questions.questions?.length) && <p className={styles.result}>{result}</p>}
                <div className={styles.controls}>
                    {currentStep > 0 && (
                        <button className={styles.backBtn} disabled={currentStep > answers.length + 1}
                                onClick={handleGoBack}>Go Back</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionnaireModal;
