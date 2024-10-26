import anthropic;
from flask import Flask, jsonify, request;

client = anthropic.Anthropic()

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
        "Content": study_guide_string
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)