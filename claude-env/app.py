import os
import anthropic;
from flask import Flask, jsonify, request;
import os
import studyHelpers
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=api_key)
# '7c921b05e459fd3a2cd14b0fe2a7dc6367f489fe'

study_guide_global = None
study_planner_global = None
subject_global = None
topics_global = None
learning_goals_global = None
test_date_global = None
session_number_global = None
session_length_global = None 

app = Flask(__name__)

@app.route('/materials', methods=["POST"])
def create_study_guide_and_planner():
    user_data = request.json
    subject_global, topics_global, learning_goals_global = (user_data['subject'], user_data['topics'], user_data['learning_goals'])
    test_date_global, session_number_global, session_length_global = (user_data['date'], user_data['number'], user_data['length'])

    study_guide_global = studyHelpers.create_study_guide(subject_global, topics_global, learning_goals_global)
    study_planner_global = studyHelpers.create_study_planner(study_guide_global, subject_global, test_date_global, session_number_global, session_length_global, topics_global, learning_goals_global)

    response = {
        "Message": "returning study guide to user",
        "Study Guide": study_guide_global,
        "Study Planner": study_planner_global
    }

    return jsonify(response)




format_study_questions = "Session number: \n\n[Study Question], \n[Answer], \n[Explanation of the answer], repeat for multiple questions (questions should have a range of difficulty, some multiple choice and some long answer/show-your-work), repeat for every session number"
@app.route("/questions", methods=["POST"])
def create_study_questions():
    user_data = request.json
    study_questions = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        temperature=0,
        system=f"You are an expert educator in {subject_global} helping a student learn this topic in preparation for an exam",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""I am a student studying for an exam in {subject_global}. For each of the topics in {topics_global} create a 
                                    study questions for each topic that will help me study for the exam, the questions should range 
                                    from easy to hard and should be a mix of multiple choice, true/false, and short answer questions. 
                                    For each question, provide the answer and an explanation of the answer. 
                                    These questions should align with study session topic in the study planner's session day.
                                    STUDY GUIDE: {study_guide_global}
                                    STUDY PLANNER: {study_planner_global}
                                    FORMAT OF STUDY QUESTIONS: {format_study_questions}
                                    DO THIS WITH EVERY SESSION, SHOULD HAVE A TOTAL OF {session_number_global} SESSIONS
                                """
                    }
                ]
            }
        ]
    )

    study_questions_string = str(study_questions.content)[17:-16].replace("\\n", "\n")

    return study_questions_string


if __name__ == '__main__':
    app.run(debug=True)