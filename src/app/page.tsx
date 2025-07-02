'use client'

export default function Home() {
  return (
    <main style={{ padding: '2rem', marginLeft: '50px' }}>
      <h1>Video Streaming Demo 
        <br/>Node.js and Next.js Technologies
      </h1>
      
      <br/><br/>

      <h2>Video 1</h2>
      <video
        width="640"
        height="360"
        controls
        src="/api/video?name=video-01.mp4"
      />

      <br/><br/><br/>

      <h2>Video 2</h2>
      <video
        width="640"
        height="360"
        controls
        src="/api/video?name=video-02.mp4"
      />
    </main>
  )
}