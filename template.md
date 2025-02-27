# Project Management Quiz App

**How to Use This Data for Your Quiz App:**

1. **Data Format:** The JSON format provided is readily usable in most programming languages. You can parse this data and structure it within your quiz app.

2. **Quiz Logic:**
   * For each question, display the question and the four options.
   * Allow the user to select an option.
   * Check if the selected option matches the `correct_answer`.
   * Provide immediate feedback (correct/incorrect).
   * Optionally, display the `explanation` to reinforce learning.
   * Keep track of user scores and progress.

3. **Expand and Categorize:**
   * **Topic Grouping:**  Incorporate the topic categories (Fundamentals, Agile Principles, Scrum, Kanban, Processes) into your app to allow users to focus on specific areas.
   * **Difficulty Levels:** You can add a "difficulty" field to each question and create quizzes with varying difficulty.
   * **More Questions:**  This is just a starting set! You should significantly expand the question bank covering more topics within each area and adding new areas like:
      * Project Communication Management
      * Project Resource Management
      * Project Quality Management
      * Project Cost Management
      * Leadership and Soft Skills for Project Managers
      * Different Project Management Methodologies (Waterfall, Lean, etc.)
      * Advanced Scrum topics (Scaling Scrum, etc.)

4. **User Experience:**
   * Make the quiz engaging and visually appealing.
   * Also make it mobile friendly
   * Data will be stored in questions.json

I will provide you with questions categorized by topic for better learning organization. Each question will have:

* **Question:** The question itself.
* **Options:** Four answer options (A, B, C, D).
* **Correct Answer:**  The letter of the correct option.
* **Explanation (Optional but Highly Recommended):** A brief explanation of why the correct answer is right and why the others are wrong.  This is crucial for learning!

**Data Template**
```json
{
  "Fundamentals of Project Management": [
    {
      "question": "...",
      "options": [...],
      "correct_answer": "...",
      "explanation": "..."
    },
    // ... more questions for Fundamentals ...
  ],
  "Agile Principles and Values": [
    {
      "question": "...",
      "options": [...],
      "correct_answer": "...",
      "explanation": "..."
    },
    // ... more questions for Agile Principles ...
  ],
  "Scrum Framework": [
    {
      "question": "...",
      "options": [...],
      "correct_answer": "...",
      "explanation": "..."
    },
    // ... more questions for Scrum ...
  ],
  // ... and so on for other categories ...
}
```