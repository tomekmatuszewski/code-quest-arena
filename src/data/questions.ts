export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What does 'console.log()' do in JavaScript?",
    options: ["Prints output to the console", "Creates a new variable", "Defines a function", "Loops through an array"],
    correctAnswer: 0,
    language: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2,
    language: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the output of: typeof null?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: 2,
    language: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "In Python, what does 'len()' function return?",
    options: ["The type of object", "The length/size of object", "The last element", "A boolean value"],
    correctAnswer: 1,
    language: "Python",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What is the correct way to create a function in Python?",
    options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
    correctAnswer: 1,
    language: "Python",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["==", "===", "!=", "="],
    correctAnswer: 1,
    language: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "What does 'NaN' stand for in JavaScript?",
    options: ["Not a Null", "Not a Number", "New and Native", "None and Nothing"],
    correctAnswer: 1,
    language: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "In React, what hook is used for side effects?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    correctAnswer: 1,
    language: "React",
    difficulty: "medium"
  },
  {
    id: 9,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: 2,
    language: "Algorithms",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Which CSS property is used to change text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: 2,
    language: "CSS",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Query Language"],
    correctAnswer: 0,
    language: "SQL",
    difficulty: "easy"
  },
  {
    id: 12,
    question: "In Git, what command creates a new branch?",
    options: ["git new", "git create", "git branch", "git make"],
    correctAnswer: 2,
    language: "Git",
    difficulty: "easy"
  },
  {
    id: 13,
    question: "What is a closure in JavaScript?",
    options: ["A way to close the browser", "A function with access to its outer scope", "A method to end a loop", "A type of variable"],
    correctAnswer: 1,
    language: "JavaScript",
    difficulty: "hard"
  },
  {
    id: 14,
    question: "Which Python data structure is immutable?",
    options: ["List", "Dictionary", "Set", "Tuple"],
    correctAnswer: 3,
    language: "Python",
    difficulty: "medium"
  },
  {
    id: 15,
    question: "What does 'DOM' stand for?",
    options: ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "Document Orientation Mode"],
    correctAnswer: 0,
    language: "Web",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "In TypeScript, what does 'interface' define?",
    options: ["A function", "A shape of an object", "A loop structure", "A database connection"],
    correctAnswer: 1,
    language: "TypeScript",
    difficulty: "medium"
  },
  {
    id: 17,
    question: "What is the purpose of 'async/await' in JavaScript?",
    options: ["To style elements", "To handle asynchronous operations", "To create classes", "To define variables"],
    correctAnswer: 1,
    language: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 18,
    question: "Which HTTP method is used to update a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 2,
    language: "Web",
    difficulty: "medium"
  },
  {
    id: 19,
    question: "What is 'recursion' in programming?",
    options: ["A loop structure", "A function calling itself", "An error type", "A data type"],
    correctAnswer: 1,
    language: "Algorithms",
    difficulty: "medium"
  },
  {
    id: 20,
    question: "In CSS Flexbox, what does 'justify-content' control?",
    options: ["Vertical alignment", "Horizontal alignment", "Font size", "Border style"],
    correctAnswer: 1,
    language: "CSS",
    difficulty: "medium"
  }
];

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
