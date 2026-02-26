import { useState } from "react";
import { PaperPlaneTilt, MapPin, Phone, Envelope } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "Success!", description: "Message sent. We'll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <section id="contact">
      {/* Black CTA header block */}
      <div className="py-20 bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-white/50 font-heading text-xs uppercase tracking-[0.3em] mb-5">
              Get In Touch
            </p>
            <h2 className="text-white font-heading font-bold text-4xl md:text-6xl uppercase leading-tight mb-6">
              NEED A CONSULTATION?
            </h2>
            <p className="text-white/70 text-base font-body mb-10 max-w-xl">
              Drop us a line. We are here to answer your questions and provide the solutions your business needs.
            </p>
            <a
              href="mailto:info@suresafety.co.zm"
              className="inline-block border border-white text-white text-xs font-heading font-bold uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
            >
              info@suresafety.co.zm
            </a>
          </motion.div>
        </div>
      </div>

      {/* Form section */}
      <div className="py-20 lg:py-28 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Our Office", value: "Lusaka, Zambia" },
                  { icon: Phone, label: "Phone", value: "+260 211 123 456" },
                  { icon: Envelope, label: "Email", value: "info@suresafety.co.zm" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" weight="fill" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground text-xs uppercase tracking-wider">{item.label}</p>
                      <p className="text-muted-foreground text-sm mt-1 font-body">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-section-alt border border-border">
                <p className="font-heading font-bold text-foreground mb-3 text-xs uppercase tracking-wider">Business Hours</p>
                <div className="space-y-1.5 text-sm text-muted-foreground font-body">
                  <div className="flex justify-between"><span>Mon – Fri:</span><span>08:00 – 17:00</span></div>
                  <div className="flex justify-between"><span>Saturday:</span><span>09:00 – 13:00</span></div>
                  <div className="flex justify-between"><span>Sunday:</span><span className="text-primary font-semibold text-xs">Closed</span></div>
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="lg:col-span-3 space-y-4"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name *</p>
                  <Input className="bg-section-alt border-none focus-visible:ring-primary/30 h-12" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address *</p>
                  <Input type="email" className="bg-section-alt border-none focus-visible:ring-primary/30 h-12" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</p>
                <Input className="bg-section-alt border-none focus-visible:ring-primary/30 h-12" placeholder="+260 9xx xxx xxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">How can we help? *</p>
                <Textarea className="bg-section-alt border-none focus-visible:ring-primary/30 resize-none" placeholder="Tell us about your project..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-black font-heading font-bold text-xs uppercase tracking-[0.2em] h-12 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"} <PaperPlaneTilt className="w-4 h-4" weight="fill" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
