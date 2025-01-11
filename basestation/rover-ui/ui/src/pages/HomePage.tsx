import Map from "../components/map";

export default function HomePage() {
  return (
    <section className="container flex flex-row justify-evenly gap-3 pb-8 pt-6 md:py-10">
      <div className="relative">
        <div
          className="absolute top-0 left-10"
          style={{
            width: "200px",
            height: "200px",
            border: "4px solid green",
            borderRadius: "50%",
            overflow: "hidden",
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Map />
        </div>
      </div>
    </section>
  );
}
