import fs from 'fs'
import path from 'path'

const VALID_VIDEOS = ['video-1.mp4', 'video-2.mp4'];

export async function GET(req){
    const { searchParams } = new URL(req.url)
    const videoName = searchParams.get('name') || 'video-1.mp4'

    if(!VALID_VIDEOS.includes(videoName)){
        return new Response('Invalid video name', {status: 400})
    }

    const range = req.headers.get('range')
    if(!range){
        return new Response('Range header is required', { status: 400 })
    }

    const videoPath = path.resolve('.', 'videos', videoName)
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6 // 1MB
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Type": "video/mp4",
    }

    const stream = fs.createReadStream(videoPath, {start, end})
    return new Response(stream, {status: 206, headers})
}