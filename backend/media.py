# old yt dowloader repurposed into local storage music
import uvicorn
from fastapi import Query
import fastapi
import requests
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

YDL_OPTS = {
    'format': 'bestaudio/best',
    'quiet': True,
    "no_warnings": True,
    "noplaylist": True,
    "skip_download": True,
    "extract_flat": "in_playlist",
}


def get_stream_and_meta(url: str):
    with yt_dlp.YoutubeDL(YDL_OPTS) as ydl:
        info = ydl.extract_info(url, download=False)
        return {
            "stream_url": info.get("url"),
            "title": info.get("title", "Unknown Title"),
            "duration": info.get("duration"),
        }


def stream_audio_chunks(stream_url: str):
    with requests.get(stream_url, stream=True, timeout=10) as r:
        for chunk in r.iter_content(chunk_size=64 * 1024):
            if chunk:
                yield chunk


@app.get("/stream-song")
def stream_song(url: str = Query(...), meta: bool = Query(False)):
    if not url:
        return {"error": "No URL provided"}

    try:
        data = get_stream_and_meta(url)

        if meta:
            return {
                "title": data["title"],
                "duration": data["duration"],
            }

        if not data["stream_url"]:
            return {"error": "Could not extract stream URL"}

        return StreamingResponse(
            stream_audio_chunks(data["stream_url"]),
            media_type="audio/mpeg"
        )
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run("media:app", host="0.0.0.0", port=8000, reload=False)
