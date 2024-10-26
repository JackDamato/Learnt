import anthropic;
from flask import Flask, jsonify, request;


ANTHROPIC_API_KEY = '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'
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


#subject = "Discrete Mathematics"
#topics = "Proof by contradiction, proof by induction, set notation, set operations, set equivalence"
#learning_goals = "I'm struggling in proof by induction and I want to learn how to do it better"

app = Flask(__name__)

@app.route('/', methods=["POST"])
def create_study_guide():
    user_data = request.json
    subject, topics, learning_goals = (user_data['subject'], user_data['topics'], user_data['learning_goals'])

    study_guide = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2000,
        temperature=0,
        system=f"You are an expert educator in {subject} helping a student learn this topic in preparation for an exam",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""I am a student studying for an exam in {subject}. For each of the topics in {topics} create a 
                                    detailed study guide that describes in depth the topic, definitions related to the topic, 
                                    concepts related to the topic, how it can be tested on an exam, and example questions and solutions.
                                    I have some focused goals of subjects I want to focus on: {learning_goals}. Do not let this affect any 
                                    other subjects, just go further into depth for learning_goals
                                    Combine each of these into an organized study guide that will help me study for the exam.
                                """
                    }
                ]
            }
        ]
    )

    study_guide_string = str(study_guide.content)[17:-16].replace("\\n", "\n")

    response = {
        "Message": "returning study guide to user",
        "Content": study_guide_string,
        "Study Guide": create_study_planner(study_guide_string)
    }

    return jsonify(response)


format_study_planner = "Session number: \n\n[Duration], \n[Topics and Concepts to study], \n[Practice Questions to focus on]\n [Any other pertinent information to the session focus]...... INCLUDE BREAK TIME AND SCHEDULING"

def create_study_planner(study_guide):
    user_data = request.json
    subject, topics, learning_goals = (user_data['subject'], user_data['topics'], user_data['learning_goals'])
    test_date, session_number, session_length = (user_data['date'], user_data['number'], user_data['length'])
    
    study_planner = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        temperature=0,
        system=f"You are an expert of time management helping a student plan their study schedule for an upcoming exam",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""I have a exam on {subject} on {test_date}. I have {session_number} study sessions of {session_length} hours each. 
                                    I have a study guide and study planner format that I want to use to study for the exam, which will be attached to the end of this prompt. 
                                    I want to focus on the topics in {topics} and my learning goals are {learning_goals}.
                                    Given the study guide, create a study plan that will help me study for the exam in the time I have available, 
                                    for each study session explicity: tell me what to study, how to study in terms how times for working and break time in minutes, 
                                    and what to do after the study session.
                                    STUDY GUIDE: {study_guide}
                                    FORMAT OF STUDY PLANNER: {format_study_planner}
                                    Repeat the format above for every single session
                                """
                    }
                ]
            }
        ]
    )

    study_planner_string = str(study_planner.content)[17:-16].replace("\\n", "\n")

    return study_planner_string

if __name__ == '__main__':
    app.run(debug=True)