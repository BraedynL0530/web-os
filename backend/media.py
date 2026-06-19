# old yt dowloader repurposed into local storage music
import os
import re
import fastapi
import requests
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VideoRequest(BaseModel):
    url: str


def stream_youtube_audio(url: str):
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        stream_url = info["url"]

    r = requests.get(stream_url, stream=True)

    for chunk in r.iter_content(chunk_size=64 * 1024):
        if chunk:
            yield chunk


@app.post("/stream-song")
def stream_song(request: VideoRequest):
    if not request.url:
        return {"error": "No URL provided"}

    try:
        return StreamingResponse(
            stream_youtube_audio(request.url),
            media_type="audio/mpeg"
        )
    except Exception as e:
        return {"error": str(e)}

