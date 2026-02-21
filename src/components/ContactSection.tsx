import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      toast({ title: "Success!", description: "Your message has been sent. We'll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-card">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Request a Consultation
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Contact us to learn more about our construction services and customized maintenance solutions.
          </p>
        </motion.div>

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
                { icon: Mail, label: "Email", value: "info@suresafety.co.zm" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-section-alt rounded-2xl border border-border">
              <p className="font-heading font-bold text-foreground mb-2">Business Hours</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Mon - Fri:</span> <span>08:00 - 17:00</span></div>
                <div className="flex justify-between"><span>Saturday:</span> <span>09:00 - 13:00</span></div>
                <div className="flex justify-between"><span>Sunday:</span> <span className="text-primary font-semibold text-xs">Closed</span></div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 p-8 bg-card rounded-2xl border border-border shadow-sm"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground ml-1">Full Name *</p>
                <Input
                  className="bg-section-alt border-none focus-visible:ring-primary/30 h-12"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground ml-1">Email Address *</p>
                <Input
                  type="email"
                  className="bg-section-alt border-none focus-visible:ring-primary/30 h-12"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground ml-1">Phone Number</p>
              <Input
                className="bg-section-alt border-none focus-visible:ring-primary/30 h-12"
                placeholder="+260 9xx xxx xxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={20}
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground ml-1">How can we help? *</p>
              <Textarea
                className="bg-section-alt border-none focus-visible:ring-primary/30 resize-none"
                placeholder="Tell us about your project..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold h-12 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {sending ? "Sending..." : "Send Message"} <Send className="ml-2 w-4 h-4" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
