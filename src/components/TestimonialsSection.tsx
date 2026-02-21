import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "We have procured discrete sizes of LV and MV cables along with solar cables and to date we have recorded no quality issues nor their delivery. We highly recommend them as a supplier of electrical cables.",
    company: "POWERSPEED ELECTRICAL LIMITED",
    location: "Zimbabwe",
  },
  {
    text: "Neelkanth Cables Limited has performed its duties in an excellent manner meeting both the technical requirement of the conductor and the delivery schedule. The manufacturing and quality control processes are up to date and in line with the best practices in the industry.",
    company: "SIMBA ELECTRICAL LTD.",
    location: "Lusaka - Zambia",
  },
  {
    text: "The Quality & Performance of Cables & services supplied by Neelkanth Cables Ltd was found satisfactory and in line with the industry specifications. We would recommend them to any prospective buyer.",
    company: "ELECTROMATE",
    location: "Malawi",
  },
  {
    text: "Lafarge Zambia Plc has procured discrete sizes of LV & MV Cables from Neelkanth Cables Ltd. The Quality & Performance was found satisfactory and in line with industry specifications.",
    company: "LAFARGE",
    location: "Zambia",
  },
  {
    text: "We are satisfied with both the product quality and service of Neelkanth Cables Limited. We do not have any hesitation to recommend Neelkanth Cables Limited to any prospective buyer.",
    company: "PCTL AUTOMATION LTD",
    location: "Kenya",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 lg:py-28 bg-section-dark">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-section-dark-fg">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
          <blockquote className="text-section-dark-fg/90 text-lg md:text-xl leading-relaxed italic mb-8 min-h-[120px]">
            "{t.text}"
          </blockquote>
          <p className="font-heading font-bold text-primary text-sm tracking-wide">{t.company}</p>
          <p className="text-section-dark-fg/60 text-sm mt-1">{t.location}</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-section-dark-fg/20 flex items-center justify-center text-section-dark-fg/60 hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-section-dark-fg/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-section-dark-fg/20 flex items-center justify-center text-section-dark-fg/60 hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
