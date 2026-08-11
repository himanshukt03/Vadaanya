import VideoGalleryClient from "./VideoGalleryClient";

export default function VideoGallery() {
  return (
    <section id="videos" className="vad-section vad-section--paper">
      <div className="vad-container">
        <div className="vad-head vad-head--center vad-head--light">
          <span className="vad-eyebrow vad-eyebrow--dark">Media</span>
          <h2>
            Watch Our{" "}
            <span style={{ color: "var(--vad-navy-700)" }}>Story Unfold</span>
          </h2>
          <p className="vad-lead">
            Events, testimonials, government recognition, and community moments — all captured in these films.
          </p>
        </div>

        {/* Client component handles the fetch + render */}
        <VideoGalleryClient />
      </div>
    </section>
  );
}
