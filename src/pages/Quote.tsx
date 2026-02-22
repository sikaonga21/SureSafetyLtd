import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Calculator,
    FileText,
    User,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Building2,
    Zap,
    Droplets,
    Paintbrush,
    Truck
} from "lucide-react";
import { toast } from "sonner";

const serviceOptions = [
    { id: "building", name: "General Building", icon: Building2 },
    { id: "electrical", name: "Electrical Installation", icon: Zap },
    { id: "plumbing", name: "Plumbing & HVAC", icon: Droplets },
    { id: "finishing", name: "Painting & Finishing", icon: Paintbrush },
    { id: "infrastructure", name: "Road & Paving", icon: Truck },
];

const QuotePage = () => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        toast.success("Quote request sent successfully!");
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="py-20 lg:py-28">
                <div className="container max-w-4xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-primary font-heading font-bold text-sm tracking-[0.3em] uppercase mb-4">Request a Quote</p>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 font-heading">
                            Plan Your Next <span className="text-primary">Masterpiece</span>
                        </h1>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                            Provide us with some basic details about your project, and our team of experts will get back to you with a comprehensive quote.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="p-8 lg:p-12">
                                {/* Form Progress */}
                                <div className="flex items-center justify-between mb-12 max-w-md mx-auto relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 w-full -z-10`}>
                                        <div className={`h-full bg-primary transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }} />
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
                                </div>

                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center mb-10">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Select a Service</h2>
                                            <p className="text-slate-500">What kind of project are we looking at?</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {serviceOptions.map((service) => (
                                                <button
                                                    key={service.id}
                                                    type="button"
                                                    onClick={() => setSelectedService(service.id)}
                                                    className={`p-6 rounded-2xl border-2 text-left transition-all group hover:shadow-lg ${selectedService === service.id ? 'border-primary bg-primary/5 shadow-primary/10' : 'border-slate-100 hover:border-primary/30'}`}
                                                >
                                                    <service.icon className={`w-8 h-8 mb-4 transition-colors ${selectedService === service.id ? 'text-primary' : 'text-slate-400 group-hover:text-primary/70'}`} />
                                                    <span className={`font-bold block ${selectedService === service.id ? 'text-primary' : 'text-slate-900'}`}>{service.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex justify-center pt-6">
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!selectedService}
                                                className="bg-primary text-white px-10 py-6 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                            >
                                                Next Details <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center mb-10">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Details</h2>
                                            <p className="text-slate-500">Tell us a bit more about the scope.</p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Project Location</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input className="pl-12 h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white" placeholder="e.g. Lusaka, Kitwe..." required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Estimated Budget (ZMW)</label>
                                                <div className="relative">
                                                    <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input className="pl-12 h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white" placeholder="e.g. 50,000" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Project Timeline</label>
                                                <select className="flex h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer">
                                                    <option value="emergency">Emergency / Immediately</option>
                                                    <option value="1month">Within 1 Month</option>
                                                    <option value="3months">Within 3 Months</option>
                                                    <option value="planning">Just Planning / Not Sure</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Urgency Level</label>
                                                <div className="flex gap-4">
                                                    {['Low', 'Medium', 'High'].map((level) => (
                                                        <button
                                                            key={level}
                                                            type="button"
                                                            className="flex-1 py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-500 hover:border-primary/30 transition-all active:scale-95"
                                                            onClick={(e) => {
                                                                const targets = e.currentTarget.parentElement?.querySelectorAll('button');
                                                                targets?.forEach(t => {
                                                                    t.classList.remove('border-primary', 'bg-primary/5', 'text-primary');
                                                                    t.classList.add('border-slate-100', 'text-slate-500');
                                                                });
                                                                e.currentTarget.classList.remove('border-slate-100', 'text-slate-500');
                                                                e.currentTarget.classList.add('border-primary', 'bg-primary/5', 'text-primary');
                                                            }}
                                                        >
                                                            {level}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Project Description</label>
                                                <Textarea
                                                    className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl focus:bg-white p-6"
                                                    placeholder="Describe the project requirements, dimensions, or any specific needs..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="font-bold text-slate-500">Back</Button>
                                            <Button type="button" onClick={nextStep} className="bg-primary text-white px-10 py-6 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20">
                                                Final Step <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center mb-10">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact Information</h2>
                                            <p className="text-slate-500">How should we reach you?</p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input className="pl-12 h-14 bg-slate-50 border-slate-200 rounded-xl" placeholder="John Doe" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input type="email" className="pl-12 h-14 bg-slate-50 border-slate-200 rounded-xl" placeholder="john@example.com" required />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input className="pl-12 h-14 bg-slate-50 border-slate-200 rounded-xl" placeholder="+260 9xx xxx xxx" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="font-bold text-slate-500">Back</Button>
                                            <Button type="submit" className="bg-primary text-white px-12 py-6 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20">
                                                Get My Quote <Calculator className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        ) : (
                            <motion.div
                                className="p-12 lg:p-20 text-center space-y-8"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-primary animate-bounce-short" />
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-slate-900">Request Received!</h2>
                                <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                                    Thank you for choosing Sure Safety. Our team will review your project details and respond within 24-48 business hours with a preliminary quote.
                                </p>
                                <Button
                                    onClick={() => window.location.href = '/'}
                                    className="bg-primary text-white px-10 py-6 rounded-xl font-bold"
                                >
                                    Back to Home
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default QuotePage;
