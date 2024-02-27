import json
import base64
from io import BytesIO  
import google.generativeai as gen_ai
from openai import OpenAI
import requests
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel


PROJECT_ID = "[your-project-id]"  # @param {type:"string"}
LOCATION = "us-central1"  # @param {type:"string"}

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Origin',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST'
}

vertexai.init(project=PROJECT_ID, location=LOCATION)

client = OpenAI(api_key ='API_KEY')

#https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/use-cases/creating_high_quality_visual_assets_with_gemini_and_imagen.ipynb
#https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagegeneration?hl=en


VITE_GOOGLE_PROJECT_ID = "your-google-project-id"
VITE_GCLOUD_AUTH_TOKEN = "your-gcloud-auth-token"

imagen_model = ImageGenerationModel.from_pretrained("imagegeneration@005")

def lambda_handler(event, context):
    # Extract the prompt from the event
    if event['httpMethod'] == 'OPTIONS':  # Preflight request
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Adjust accordingly
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',  # Adjust accordingly
            },
            'body': json.dumps('Hello from Lambda OPTIONS')
        }

    prompt = event.get('prompt', '')
    
    # Check if the prompt contains any word related to humans
    
    if check_prompt_for_human_content(prompt):
        # Use GPT-4 to generate images
        try:
            image = generate_images_with_gpt4(prompt)
            
            # Check if the images contain anything related to humans
            # Assuming there's a function to check images for human content   
            return {
                'statusCode': 200,
                'body': json.dumps({'images': image})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'message': str(e)}),
                'headers': headers
            }
    else:
        # If the prompt does not contain human-related words, directly use Gemini
        try:
            images = generate_images_with_gemini(prompt)
            return {
                'statusCode': 200,
                'body': json.dumps({'images': images}),
                'headers': headers

            }
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(e)}),
                'headers': headers

            }

def generate_images_with_gpt4(prompt):
    # Logic to generate images with DALL·E 3 using OpenAI's API
    try:
        response = client.images.generate(
            model="dall-e-2", # Use DALL·E 3 model
            prompt="a white siamese cat",
            size="1024x1024",
            quality="standard",
            n=1,
        )
        if response and 'data' in response and len(response.data) > 0:
            image_url = response.data[0].url
            return image_url
        else:
            raise ValueError("No data returned from image generation API.")
    except Exception as e:
        raise Exception(f"Failed to generate image with DALL·E 3: {str(e)}")

def generate_images_with_gemini(prompt):
    if not prompt:
        return

    url = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{VITE_GOOGLE_PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration:predict"

    headers = {
        "Authorization": f"Bearer {VITE_GCLOUD_AUTH_TOKEN}"
    }

    payload = {
        "instances": [
            {
                "prompt": prompt
            }
        ],
        "parameters": {
            "sampleCount": 1
        }
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raises a HTTPError if the response status code is 4XX/5XX
        data = response.json()
        base64_string = data['predictions'][0]['bytesBase64Encoded']
        image_data = base64_string
        preview = f"data:image/png;base64,{image_data}"
        print("Image is processing...please wait!!!")
        return preview
    except requests.exceptions.RequestException as err:
        print(err)

def generate_images_with_gemini_2(prompt):
    if not prompt:
        return
    
    response = imagen_model.generate_images(
        prompt=prompt,
    )

    image = response.images[0]
    buffered = BytesIO()
    image.save(buffered, format="JPEG")  # Or PNG, etc.
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return img_str

def check_prompt_for_human_content(prompt):
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",        
    messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Does this '{prompt}' contain any common or proper noun used to describe human or human related words or professions. Just anything that has to do with human lives? If yes, please type 'true' else 'false'."}
            ]
    )
    answer = str(response.choices[0].message.content).lower()
    print(answer == 'true')

if __name__ == '__main__':
    prompt = "a choir singing hymn"
    check_prompt_for_human_content(prompt)