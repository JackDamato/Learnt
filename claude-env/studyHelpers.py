import anthropic;
import os
import json

client = anthropic.Anthropic()

def create_study_guide(subject, topics, learning_goals):
    study_guide = client.completions.create(
        model="claude-2",
        max_tokens_to_sample=2000,
        temperature=0,
        prompt = f"\n\nHuman:You are an expert educator in {subject} helping a student learn this topic in preparation for an exam.  am a student studying for an exam in {subject}. For each of the topics in {topics} create a detailed study guide that describes in depth the topic, definitions related to the topic, concepts related to the topic, how it can be tested on an exam, and example questions and solutions. I have some focused goals of subjects I want to focus on: {learning_goals}. Do not let this affect any other subjects, just go further into depth for learning_goals. Combine each of these into an organized study guide that will help me study for the exam.\n\nAssistant:"
    )
    return str(study_guide.completion)


format_study_planner = "Session number: \n\n[Duration], \n[Topics and Concepts to study], \n[Any other pertinent information to the session focus]...... INCLUDE BREAK TIME AND SCHEDULING"
def create_study_planner(study_guide, subject, test_date, session_number, session_length, topics, learning_goals):
    study_planner = client.completions.create(
        model="claude-2",
        max_tokens_to_sample=1000,
        temperature=0,
        prompt = f"\n\nHuman:You are an expert of time management helping a student plan their study schedule for an upcoming exam. I have a exam on {subject} on {test_date}. I have {session_number} study sessions of {session_length} hours each. I have a study guide and study planner format that I want to use to study for the exam, which will be attached to the end of this prompt. I want to focus on the topics in {topics} and my learning goals are {learning_goals}. Given the study guide, create a study plan that will help me study for the exam in the time I have available, for each study session explicity: tell me what to study, how to study in terms how times for working and break time in minutes, and what to do after the study session. STUDY GUIDE: {study_guide}. FORMAT OF STUDY PLANNER: {format_study_planner}. Repeat the format above for every single session. \n\nAssistant:"
    )
    return str(study_planner.completion)


# Imports data from the tempJson file that is being defined when a study guide request is submitted
def import_temp_json():
    json_path = 'tempData.json'
    json_data = None
    with open(json_path, 'r') as json_file:
        json_data = json.load(json_file)
    
    return json_data
