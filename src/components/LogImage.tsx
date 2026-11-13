// A picture pinned into a log: reduced to the palette, softened at the rim, with a halftone and grain on top.
export default function LogImage({ src, alt, caption, width }: { src: string; alt: string; caption?: string; width?: string }) {
  return (
    <figure className="log-image mx-auto mb-6" style={width ? { width } : undefined}>
      <div className="log-image-frame">
        <img src={src} alt={alt} className="log-image-img" loading="lazy" draggable={false} />
        <div className="log-image-dots dots-ink" aria-hidden />
      </div>
      {caption && <figcaption className="label mt-2 opacity-60">{caption}</figcaption>}
    </figure>
  )
}
