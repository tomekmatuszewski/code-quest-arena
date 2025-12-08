import database, models
from sqlalchemy.orm import Session

# Questions data translated from frontend/src/data/questions.ts
questions_data = [
  {
    "id": 1,
    "question": "What does 'console.log()' do in JavaScript?",
    "options": ["Prints output to the console", "Creates a new variable", "Defines a function", "Loops through an array"],
    "correct_answer": 0,
    "language": "JavaScript",
    "difficulty": "easy",
    "code_snippet": "console.log('Hello World');"
  },
  {
    "id": 2,
    "question": "Which keyword is used to declare a constant in JavaScript?",
    "options": ["var", "let", "const", "static"],
    "correct_answer": 2,
    "language": "JavaScript",
    "difficulty": "easy"
  },
  {
    "id": 3,
    "question": "What is the output of: typeof null?",
    "options": ["'null'", "'undefined'", "'object'", "'boolean'"],
    "correct_answer": 2,
    "language": "JavaScript",
    "difficulty": "medium",
    "code_snippet": "console.log(typeof null);"
  },
  {
    "id": 4,
    "question": "In Python, what does 'len()' function return?",
    "options": ["The type of object", "The length/size of object", "The last element", "A boolean value"],
    "correct_answer": 1,
    "language": "Python",
    "difficulty": "easy",
    "code_snippet": "my_list = [1, 2, 3]\nprint(len(my_list))"
  },
  {
    "id": 5,
    "question": "What is the correct way to create a function in Python?",
    "options": ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
    "correct_answer": 1,
    "language": "Python",
    "difficulty": "easy",
    "code_snippet": "def my_function():\n    print('Hello')"
  },
  {
    "id": 6,
    "question": "Which operator is used for strict equality in JavaScript?",
    "options": ["==", "===", "!=", "="],
    "correct_answer": 1,
    "language": "JavaScript",
    "difficulty": "easy"
  },
  {
    "id": 7,
    "question": "What does 'NaN' stand for in JavaScript?",
    "options": ["Not a Null", "Not a Number", "New and Native", "None and Nothing"],
    "correct_answer": 1,
    "language": "JavaScript",
    "difficulty": "easy"
  },
  {
    "id": 8,
    "question": "In React, what hook is used for side effects?",
    "options": ["useState", "useEffect", "useContext", "useRef"],
    "correct_answer": 1,
    "language": "React",
    "difficulty": "medium",
    "code_snippet": "useEffect(() => {\n  document.title = 'New Title';\n}, []);"
  },
  {
    "id": 9,
    "question": "What is the time complexity of binary search?",
    "options": ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    "correct_answer": 2,
    "language": "Algorithms",
    "difficulty": "medium"
  },
  {
    "id": 10,
    "question": "Which CSS property is used to change text color?",
    "options": ["text-color", "font-color", "color", "text-style"],
    "correct_answer": 2,
    "language": "CSS",
    "difficulty": "easy",
    "code_snippet": "p {\n  color: red;\n}"
  },
  {
    "id": 11,
    "question": "What does SQL stand for?",
    "options": ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Query Language"],
    "correct_answer": 0,
    "language": "SQL",
    "difficulty": "easy"
  },
  {
    "id": 12,
    "question": "In Git, what command creates a new branch?",
    "options": ["git new", "git create", "git branch", "git make"],
    "correct_answer": 2,
    "language": "Git",
    "difficulty": "easy"
  },
  {
    "id": 13,
    "question": "What is a closure in JavaScript?",
    "options": ["A way to close the browser", "A function with access to its outer scope", "A method to end a loop", "A type of variable"],
    "correct_answer": 1,
    "language": "JavaScript",
    "difficulty": "hard",
    "code_snippet": "function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}"
  },
  {
    "id": 14,
    "question": "Which Python data structure is immutable?",
    "options": ["List", "Dictionary", "Set", "Tuple"],
    "correct_answer": 3,
    "language": "Python",
    "difficulty": "medium",
    "code_snippet": "my_tuple = (1, 2, 3)\n# my_tuple[0] = 4  <-- This would raise an error"
  },
  {
    "id": 15,
    "question": "What does 'DOM' stand for?",
    "options": ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "Document Orientation Mode"],
    "correct_answer": 0,
    "language": "Web",
    "difficulty": "easy"
  },
  {
    "id": 16,
    "question": "In TypeScript, what does 'interface' define?",
    "options": ["A function", "A shape of an object", "A loop structure", "A database connection"],
    "correct_answer": 1,
    "language": "TypeScript",
    "difficulty": "medium",
    "code_snippet": "interface User {\n  name: string;\n  age: number;\n}"
  },
  {
    "id": 17,
    "question": "What is the purpose of 'async/await' in JavaScript?",
    "options": ["To style elements", "To handle asynchronous operations", "To create classes", "To define variables"],
    "correct_answer": 1,
    "language": "JavaScript",
    "difficulty": "medium",
    "code_snippet": "async function fetchData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}"
  },
  {
    "id": 18,
    "question": "Which HTTP method is used to update a resource?",
    "options": ["GET", "POST", "PUT", "DELETE"],
    "correct_answer": 2,
    "language": "Web",
    "difficulty": "medium"
  },
  {
    "id": 19,
    "question": "What is 'recursion' in programming?",
    "options": ["A loop structure", "A function calling itself", "An error type", "A data type"],
    "correct_answer": 1,
    "language": "Algorithms",
    "difficulty": "medium",
    "code_snippet": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}"
  },
  {
    "id": 20,
    "question": "In CSS Flexbox, what does 'justify-content' control?",
    "options": ["Vertical alignment", "Horizontal alignment", "Font size", "Border style"],
    "correct_answer": 1,
    "language": "CSS",
    "difficulty": "medium",
    "code_snippet": ".container {\n  display: flex;\n  justify-content: center;\n}"
  }
]

def seed():
    # Create tables
    models.Base.metadata.create_all(bind=database.engine)
    
    db = database.SessionLocal()
    try:
        # Check if questions exist
        if db.query(models.Question).count() > 0:
            print("Questions already seeded. Skipping...")
            # Ideally we might want to update or upsert, but for simple seeding:
            # We can delete all and re-seed if force_update is needed, but typically we respect existing data.
            # Given I'm adding a schema change, I'll need to nuke the DB anyway.
            # So this logic is fine as long as the DB is empty on first run.
            return

        print("Seeding questions...")
        for q in questions_data:
            question = models.Question(
                question=q["question"],
                options=q["options"],
                correct_answer=q["correct_answer"],
                language=q["language"],
                difficulty=q["difficulty"],
                code_snippet=q.get("code_snippet")
            )
            db.add(question)
        
        db.commit()
        print("Done!")
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
