import React from "react";

type SlideData = {
  id: string;
  title: string;
  body?: string;
  bg?: string;
  color?: string;
};

const slides: SlideData[] = [
  {
    id: "s1",
    title: "Hook slide",
    body: "Replace with generated carousel copy.",
    bg: "#0f172a",
    color: "#ffffff"
  }
];

const slideRoot: React.CSSProperties = {
  width: 1080,
  height: 1350,
  borderRadius: 24,
  padding: 72,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

function Slide({ slide }: { slide: SlideData }) {
  return (
    <section
      style={{
        ...slideRoot,
        background: slide.bg ?? "#111827",
        color: slide.color ?? "#ffffff"
      }}
    >
      <h1 style={{ fontSize: 78, lineHeight: 1.08, margin: 0 }}>{slide.title}</h1>
      {slide.body ? <p style={{ fontSize: 38, lineHeight: 1.3, margin: 0 }}>{slide.body}</p> : null}
    </section>
  );
}

export default function CarouselPreview() {
  return (
    <main style={{ display: "grid", gap: 24 }}>
      {slides.map((slide) => (
        <Slide key={slide.id} slide={slide} />
      ))}
    </main>
  );
}

