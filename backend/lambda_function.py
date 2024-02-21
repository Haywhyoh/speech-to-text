import json
import openai 
import os
import base64
from io import BytesIO


openai.api_key = os.environ.get('OPENAI_API_KEY')



def transcribe_audio(audio_file):


    try:
        # Convert the binary audio data into a file-like object
        audio_file_binary = audio_file.encode('utf-8')
        audio_file_obj = BytesIO(audio_file_binary)
        audio_file_obj.name = "audio.wav"
        
        # still returns invalid file format?
        transcription = openai.Audio.transcribe("whisper-1", audio_file_obj)
        return transcription['text']
    except Exception as e: 
        print(e)
        return "ERROR GENERATING TRANSCRIPT"
    


def lambda_handler(event, context):
    headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Origin',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST'
    }
    
    print(f"event: {event}")
    
    # Respond to preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'body': json.dumps('Preflight request successful'),
            'headers': headers
        }
    
    try:
        audio = event['body']
        transcription = transcribe_audio(audio)
      
        return {
            'statusCode': 200,
            'body': json.dumps(transcription),
            'headers': headers
        }
    except KeyError:
        return {
            'statusCode': 400,
            'body': json.dumps('No audio provided.'),
            'headers': headers
        }
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Something went wrong!'),
            'headers': headers
        }
    
