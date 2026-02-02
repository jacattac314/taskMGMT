import React from 'react';

/**
 * LearningLesson - Shows George his homework feedback
 *
 * This component displays:
 * - Whether the answer was correct (with fun celebration or encouragement)
 * - The score (0-100)
 * - An explanation of why the answer is right/wrong
 * - A learning lesson to remember
 * - A hint if the answer was wrong
 * - An encouraging message!
 */
function LearningLesson({ feedback, subject, onTryAgain }) {
    const {
        is_correct,
        score,
        explanation,
        learning_lesson,
        encouragement,
        hint
    } = feedback;

    return (
        <div className="learning-lesson">
            {/* Result Banner */}
            <div className={`result-banner ${is_correct ? 'correct' : 'incorrect'}`}>
                {is_correct ? (
                    <>
                        <span className="result-icon">🎉</span>
                        <h2>Great Job!</h2>
                    </>
                ) : (
                    <>
                        <span className="result-icon">💪</span>
                        <h2>Nice Try!</h2>
                    </>
                )}
            </div>

            {/* Score Display */}
            <div className="score-section">
                <div className="score-circle">
                    <span className="score-number">{score}</span>
                    <span className="score-label">points</span>
                </div>
            </div>

            {/* Explanation Card */}
            <div className="feedback-card explanation-card">
                <h3>📖 What Happened</h3>
                <p>{explanation}</p>
            </div>

            {/* Learning Lesson Card - The most important part! */}
            <div className="feedback-card lesson-card">
                <h3>💡 Today's Learning Lesson</h3>
                <p className="lesson-text">{learning_lesson}</p>
            </div>

            {/* Hint Card - Only shown if answer was wrong */}
            {hint && !is_correct && (
                <div className="feedback-card hint-card">
                    <h3>🔍 Here's a Hint</h3>
                    <p>{hint}</p>
                </div>
            )}

            {/* Encouragement */}
            <div className="encouragement">
                <p>✨ {encouragement}</p>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                <button onClick={onTryAgain} className="try-again-btn">
                    {is_correct ? '📝 New Question' : '🔄 Try Again'}
                </button>
            </div>
        </div>
    );
}

export default LearningLesson;
