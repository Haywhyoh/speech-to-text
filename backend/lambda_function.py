import json
from openai import OpenAI
# from docx import Document

client = OpenAI()

def transcribe_audio(audio_file_path):
  with open(audio_file_path, 'rb') as audio_file:
    transcription = client.audio.transcriptions.create("whisper-1", audio_file)
    return transcription['text']

def lambda_handler(event, context):
  # audio = False
  # transcription = transcribe_audio(audio)
  # process_transcription(transcription)
  
  return {
    'statusCode': 200,
    'body': json.dumps('Hello from Lambda!'),
    'headers': {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Origin',
      'Access-Control-Allow-Methods': 'GET, POST'
    }
  }

# def process_transcription(transcription):
#   return False