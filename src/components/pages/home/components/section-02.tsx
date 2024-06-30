export function Section02() {
  return (
    <section id="section02" className="flex flex-col gap-12 px-6">
      <h2 className="font-poppins text-4xl font-bold leading-snug">
        Why Enver Is The Best Choice?
      </h2>

      <p>
        Watch this one minute video so you understand why you should use our
        services!
      </p>

      <iframe
        className="min-h-[214px]"
        src="https://www.youtube.com/embed/K4TOrB7at0Y"
        title="Demo Background Sample Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  )
}
