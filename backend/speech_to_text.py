import json
import os
import tempfile
from openai import OpenAI
import base64
from email.parser import BytesParser
from email.policy import default

client = OpenAI(api_key ='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')

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Origin',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST'
}

def lambda_handler(event, context):


    try:
        if event['body']:
            audio_data = base64.b64decode(event['body'])
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Audio data is not base64-encoded'}),
                'headers': headers
            }

        transcription = transcribe_audio(audio_data)

        return {
            'statusCode': 200,
            'body': json.dumps({'transcription': transcription}),
            'headers': headers
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)}),
            'headers': headers
        }

def transcribe_audio(audio_data):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp_file:
            tmp_file.write(audio_data)
            tmp_file_path = tmp_file.name

        print("Requesting transcription...")
        with open(tmp_file_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )
        os.remove(tmp_file_path)

        return {
            'statusCode': 200,
            'body': json.dumps({'transcript': transcript}),
            'headers': headers
        }
       
    except Exception as e:
        return f"Error during transcription: {e}"