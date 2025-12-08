import { render, screen, fireEvent, act } from '@testing-library/react';
import { QuizCard } from '@/components/QuizCard';
import { Question } from '@/data/questions';

const mockQuestion: Question = {
    id: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correct_answer: 1, // Index 1 is '4'
    language: 'Math',
    difficulty: 'easy'
};

describe('QuizCard Component', () => {

    it('renders correctly', () => {
        // Render flipped (showing question)
        render(
            <QuizCard
                question={mockQuestion}
                onAnswer={() => { }}
                isFlipped={true}
                onFlip={() => { }}
            />
        );

        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('handles correct answer selection', () => {
        const onAnswerMock = vi.fn();
        vi.useFakeTimers();

        render(
            <QuizCard
                question={mockQuestion}
                onAnswer={onAnswerMock}
                isFlipped={true}
                onFlip={() => { }}
            />
        );

        // Click correct option "4" (index 1 / letter B)
        const correctButton = screen.getByText('4').closest('button');
        fireEvent.click(correctButton!);

        // Check immediate feedback
        expect(screen.getByText(/\+1 Point! Excellent!/i)).toBeInTheDocument();

        // Fast-forward timer
        act(() => {
            vi.runAllTimers();
        });

        expect(onAnswerMock).toHaveBeenCalledWith(true);
        vi.useRealTimers();
    });

    it('handles incorrect answer selection', () => {
        const onAnswerMock = vi.fn();
        vi.useFakeTimers();

        render(
            <QuizCard
                question={mockQuestion}
                onAnswer={onAnswerMock}
                isFlipped={true}
                onFlip={() => { }}
            />
        );

        // Click incorrect option "3" (index 0 / letter A)
        const incorrectButton = screen.getByText('3').closest('button');
        fireEvent.click(incorrectButton!);

        // Check feedback
        expect(screen.getByText(/-1 Point/i)).toBeInTheDocument();

        // Fast-forward timer
        act(() => {
            vi.runAllTimers();
        });

        expect(onAnswerMock).toHaveBeenCalledWith(false);
        vi.useRealTimers();
    });
});
