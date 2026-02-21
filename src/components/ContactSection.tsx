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
            Send Us a Message
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Contact us to learn more about our high-quality cables and customized solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            {[
              { icon: MapPin, label: "Head Office", value: "Jebel Ali Industrial Area, Dubai, UAE" },
              { icon: Phone, label: "Phone", value: "+971 4 886 5626" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">Email</p>
                <p className="text-muted-foreground text-sm">sales@neelkanth-middleeast.com</p>
                <p className="text-muted-foreground text-sm">sales@neelkanthcables.com</p>
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
              <Input
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
              />
            </div>
            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
            />
            <Textarea
              placeholder="Your Message *"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
            />
            <Button
              type="submit"
              disabled={sending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold px-8"
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
