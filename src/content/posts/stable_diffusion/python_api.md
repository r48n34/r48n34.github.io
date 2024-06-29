---
title: "[SD] Using SD A111 api with baisc api calls"
published: 2023-12-30
description: 'Code for SD A111 api with baisc fetch call in python'
tags: [Stable diffusion]
category: Stable diffusion
draft: false
---

## Download AUTOMATIC1111 (A111)
https://github.com/AUTOMATIC1111/stable-diffusion-webui

## Official giuld to enable API calls
https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API  

## Setting
```md
Batch count: 1
Sampling steps: 27
CFG Scale: 7
Clip skip: 2

Sampler: DPM++ 2M Karras
```

## Negative Prompt
```md
EasyNegative, (worst quality:1.4), (low quality:1.4),  extra fingers, fewer fingers, blurry, watermark, logo, text, error, blurry, inaccurate eyes, extra digit,fewer digits, bad anatomy, bad hands, username, words
```

- EasyNegative    
https://civitai.com/models/7808/easynegative    

- badhandv4  
https://civitai.com/models/16993/badhandv4-animeillustdiffusion?modelVersionId=20068    


## Call with API
```python
import requests
import io
import os

import base64
from PIL import Image, PngImagePlugin
import uuid

def genImages(prompt: str, output_file_path: str = "result") -> str:
    url = "http://127.0.0.1:7860"

    option_payload = {
        "sd_model_checkpoint": "qteamixQ_gamma.safetensors [58174ec2a4]",
    }

    requests.post(url=f'{url}/sdapi/v1/options', json=option_payload)

    payload = {
        "prompt": prompt,
        "negative_prompt": "EasyNegative, (worst quality:1.4), (low quality:1.4),  extra fingers, fewer fingers, blurry, watermark, logo, text, error, blurry, inaccurate eyes, extra digit,fewer digits, bad anatomy, bad hands, username, words",
        "steps": 27,
        "batch_size": 1,
        
        "cfg_scale": 7,
        "width": 512,
        "height": 512,
        "sampler_name": "UniPC",
        "save_images": False,
    }

    response = requests.post(url=f'{url}/sdapi/v1/txt2img', json=payload)

    r = response.json()

    for index, imagesData in enumerate(r['images']):
        image = Image.open(io.BytesIO(base64.b64decode(imagesData.split(",",1)[0])))

        png_payload = {
            "image": "data:image/png;base64," + imagesData
        }
        response2 = requests.post(url=f'{url}/sdapi/v1/png-info', json=png_payload)

        pnginfo = PngImagePlugin.PngInfo()
        pnginfo.add_text("parameters", response2.json().get("info"))

        pngName = f"{uuid.uuid4()}.png"
        pngPathName = os.path.join(os.getcwd(), output_file_path, pngName)
        print(pngPathName)

        image.save(pngPathName, pnginfo=pnginfo)
        return pngPathName


if __name__ == "__main__":
    genImages(
        "1boy, solo, chibi, black hair, solo, holding iPad, purple shirt, ((round black glasses)), cool, broad face, tall,  slim, white skin, (green background), with legs and shoes, standing, full body, (burr cut: 1.3), short hair, (big forehead: 1.3), black eyes"
    )
```