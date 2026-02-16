import "./ProcessVideos.css";

export default function ProcessVideos() {
  const videos = [
    {
      title: "",
      video: "/videos/laddu.mp4",
      // thumb: "/images/laddu.jpg",
    },
    {
      title: "",
      video: "/videos/adhirasam.mp4",
      // thumb: "/images/adhirasam.jpg",
    },
    {
      title: "",
      video: "/videos/karupatti.mp4",
      // thumb: "/images/karupatti.jpg",
    },
    {
      title: "",
      video: "/videos/chikki.mp4",
      // thumb: "/images/chikki.jpg",
    },
  ];

  return (
    <section className="process-videos">
      {/* HEADER */}
      <div className="process-header">
        <span className="process-sub">OUR PROCESS</span>
        <h2>Process Videos</h2>
        <p>
          A glimpse into how our traditional sweets are carefully prepared with
          hygiene, precision, and passion.
        </p>
      </div>

      {/* VIDEO ROW */}
      <div className="video-row">
        {videos.map((v, i) => (
          <div className="video-card" key={i}>
            <video
              src={v.video}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
              onClick={(e) => {
                e.target.muted = false; // 🔊 SOUND ON
                e.target.volume = 1;
                e.target.play();
              }}
            />

            {/* MUTE / UNMUTE */}
            <div
              className="mute-icon"
              onClick={(e) => {
                const video = e.currentTarget.previousSibling;
                video.muted = !video.muted;
                video.play();
              }}
            >
              🔊
            </div>

            {/* BOTTOM INFO */}
            <div className="video-info">
              <img src={v.thumb} alt={v.title} />
              <span>{v.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
