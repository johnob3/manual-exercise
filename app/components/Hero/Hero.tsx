'use client'
import {useState} from "react";
import Image from 'next/image'
import styles from "./Hero.module.scss";
import QuestionnaireModal from "../QuestionnaireModal/QuestionnaireModal";

export default function Hero() {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0,0)
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        document.body.style.overflow = 'unset';
        setModalOpen(false);
    }

    return (
        <>
            <main className={styles.Hero}>
                <nav className={styles.Nav}>
                    <Image className={styles.Logo} src={'/assets/logo.svg'} alt={'manual'} width={40} height={40}/>
                </nav>
                <article className={styles.CTA}>
                    <h2>
                        Be good
                        to yourself
                    </h2>
                    <p>
                        We’re working around the clock to bring you a holistic approach to your wellness. From top to
                        bottom, inside and out.
                    </p>
                    <button onClick={handleOpenModal}>
                        Take the quiz
                    </button>
                </article>
            </main>
            <QuestionnaireModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </>
    )
}
