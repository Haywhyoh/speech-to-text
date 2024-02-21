import requests

# URL of the API Gateway triggering your Lambda function
url = 'https://iehehqhgx0.execute-api.eu-north-1.amazonaws.com/default/speech_to_text'

# Path to your music file
file_path = 'part_2.mp3'

import base64

with open(file_path, 'rb') as file:
    audio_data = file.read()
    encoded_data = base64.b64encode(audio_data).decode('utf-8')
    payload = {'body': encoded_data}
    response = requests.post(url, json=payload)

    if response.status_code == 200:
        response_data = response.json()
        transcription = response_data.get('transcription', 'Transcription not available')
        print("Transcription:", transcription)
    else:
        print("Error:", response.text)