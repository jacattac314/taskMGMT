import React, { useState } from 'react';
import LearningLesson from './LearningLesson';

/**
 * HomeworkChecker - Main component for George to submit homework
 *
 * How it works:
 * 1. George picks a subject (Math, Science, etc.)
 * 2. George types in the question and his answer
 * 3. Click "Check My Homework"
 * 4. ChatGPT checks it and sends back feedback
 * 5. George sees if he's right + a learning lesson!
 */
function HomeworkChecker() {
    // What George is working on
    const [subject, setSubject] = useState('math');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Feedback from ChatGPT
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // List of subjects George can pick from
    const subjects = [
        { id: 'math', name: 'Math', icon: '🔢' },
        { id: 'science', name: 'Science', icon: '🔬' },
        { id: 'english', name: 'English', icon: '📚' },
        { id: 'history', name: 'History', icon: '🏛️' },
        { id: 'spelling', name: 'Spelling', icon: '✏️' }
    ];

    // Send homework to be checked
    async function checkHomework(e) {
        e.preventDefault();

        // Make sure George filled everything in
        if (!question.trim() || !answer.trim()) {
            setError('Please fill in both the question and your answer!');
            return;
        }

        setIsLoading(true);
        setError(null);
        setFeedback(null);

        try {
            const response = await fetch('/api/homework/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: subject,
                    question: question,
                    student_answer: answer,
                    grade_level: 'elementary'
                }),
            });

            if (!response.ok) {
                throw new Error('Oops! Something went wrong. Please try again.');
            }

            const result = await response.json();
            setFeedback(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    // Start fresh with a new question
    function resetForm() {
        setQuestion('');
        setAnswer('');
        setFeedback(null);
        setError(null);
    }

    return (
        <div className="homework-checker">
            <header className="header">
                <h1>📝 George's Homework Helper</h1>
                <p className="subtitle">Let's check your homework and learn something new!</p>
            </header>

            {/* Show feedback if we have it, otherwise show the form */}
            {feedback ? (
                <LearningLesson
                    feedback={feedback}
                    subject={subject}
                    onTryAgain={resetForm}
                />
            ) : (
                <form onSubmit={checkHomework} className="homework-form">
                    {/* Subject Picker */}
                    <div className="form-group">
                        <label>What subject is this?</label>
                        <div className="subject-buttons">
                            {subjects.map(s => (
                                <button
                                    key={s.id}
                                    type="button"
                                    className={`subject-btn ${subject === s.id ? 'active' : ''}`}
                                    onClick={() => setSubject(s.id)}
                                >
                                    {s.icon} {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Question Input */}
                    <div className="form-group">
                        <label htmlFor="question">What's the question?</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type or paste your homework question here..."
                            rows={3}
                        />
                    </div>

                    {/* Answer Input */}
                    <div className="form-group">
                        <label htmlFor="answer">Your answer:</label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            rows={3}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="check-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? '🔍 Checking...' : '✨ Check My Homework!'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default HomeworkChecker;
