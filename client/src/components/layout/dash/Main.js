import React, { useEffect, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import './main.css';

const Main = () => {
    const { name } = useAuth();

    const sentences = [
        `שלום ${name} וברוכים הבאים לאתר שלנו`,
        "אנו כאן כדי לעזור לך.",
        "צור קשר לפרטים נוספים",
        "נשמח לשמוע תגובות..."
    ];

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [allTexts, setAllTexts] = useState([]);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        let typingTimeout;
        if (charIndex < sentences[currentSentenceIndex].length) {
            typingTimeout = setTimeout(() => {
                setCurrentText((prev) => prev + sentences[currentSentenceIndex][charIndex]);
                setCharIndex(charIndex + 1);
            }, 80); // זמן הקלדה בין אות לאות
        } else {
            typingTimeout = setTimeout(() => {
                setAllTexts((prev) => [...prev, currentText]);
                setCurrentText('');
                setCharIndex(0);
                setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
                if (currentSentenceIndex === sentences.length - 1) {
                    setAllTexts([]);
                }
            }, 1000); // זמן המתנה בין משפטים
        }

        return () => clearTimeout(typingTimeout);
    }, [charIndex, currentSentenceIndex, sentences, currentText]);

    return (
        <div className='main'>
            <div className="rotating-sentences">
                {allTexts.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
                <p>{currentText}</p>
            </div>
            <img className="logo" src="logoKupa-removebg-preview.png" alt="Logo" />
        </div>
    );
};

export default Main;
