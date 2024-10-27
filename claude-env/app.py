import json
import os
import anthropic;
from flask import Flask, jsonify, request;
import studyHelpers;
import json;
from dotenv import load_dotenv;

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=api_key)


app = Flask(__name__)

@app.route('/materials', methods=["POST"])
def create_study_guide_and_planner():
    user_data = request.json
    subject, topics, learning_goals = (user_data['subject'], user_data['topics'], user_data['learning_goals'])
    test_date, session_number, session_length = (user_data['date'], user_data['number'], user_data['length'])

    study_guide = studyHelpers.create_study_guide(subject, topics, learning_goals)
    study_planner = studyHelpers.create_study_planner(study_guide, subject, test_date, session_number, session_length, topics, learning_goals)

    response = {
        "Message": "returning study guide to user",
        "study_guide": study_guide,
        "study_planner": study_planner,
        "user_data": user_data
    }

    # Save to tempData.json, wrote the json file

    json_file = open('tempData.json', 'w')
    json.dump(response, json_file, indent=4)
    json_file.close()
    

    return jsonify(response)


@app.route("/questions", methods=["POST"])
def create_study_questions():
    user_data = request.json
    current_session = user_data['session_number']
    json_data = studyHelpers.import_temp_json()
    subject, guide, planner = (json_data['user_data']['subject'], json_data['study_guide'], json_data['study_planner'],)


    format_study_questions = "Session current #: \n\n[Study Question], \n[Answer], \n[Explanation of the answer], repeat for multiple questions (the questions should have a range of difficulty, some multiple choice, some true/false, some short answers and at least 2 long answer/show-your-work questions that are difficult)"
    study_questions = client.completions.create(
        model="claude-2",
        max_tokens_to_sample=2000,
        temperature=0,
        prompt=f"""\n\nHuman:You are an expert educator in {subject} helping a student learn this topic in preparation for an exam... I am a student studying for an exam in {subject}. 
                You will create AT LEAST 10  DETAILED study questions for session {current_session} 
                that will help me study for the exam, the questions should have a range of difficulty,
                some multiple choice, some true/false, some short answers and at least 2 long answer/show-your-work questions that are difficult
                For each question, provide the answer and an explanation of the answer. 
                These questions should align with study session topic in the study planner's session day.
                STUDY GUIDE: {guide}
                STUDY PLANNER: {planner}
                FORMAT OF STUDY QUESTIONS: {format_study_questions}
                DO THIS FOR ONLY THE SESSION NUMBER: {current_session}
                Return the questions in the same formatting style as guide and planner include newlines and proper spacing between questions.\n\nAssistant:""",
    )

    study_questions_string = str(study_questions.completion)

    return jsonify(study_questions_string)


@app.route('/data', methods=["GET"])
def get_temp_data():
    try:
        with open('./tempData.json', 'r') as json_file:
            data = json.load(json_file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Data file not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/tutor', methods=["POST"])
def ai_tutor():
    user_input = request.json
    prompt = user_input['prompt']
    json_data = studyHelpers.import_temp_json()
    subject, guide, planner = (json_data['user_data']['subject'], json_data['study_guide'], json_data['study_planner'],)


    ai_tutor = client.completions.create(
        model="claude-2",
        max_tokens_to_sample=500,
        temperature=0,
        prompt=f"\n\nHuman:{prompt}... You are an expert educator in {subject} helping a student learn this topic in preparation for an exam. Provide a detailed explanation with very well explained information to answer the users' prompt.\n\nAssistant:"
    )
    return jsonify(str(ai_tutor.completion))

    

if __name__ == '__main__':
    app.run(debug=True)