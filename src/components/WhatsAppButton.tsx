import { motion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
    const phoneNumber = "260974397448";
    const message = "Hello Sure Safety, I would like to inquire about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors duration-300"
                        aria-label="Contact us on WhatsApp"
                    >
                        <WhatsappLogo size={32} weight="fill" />

                        {/* Pulsing effect */}
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10" />
                    </motion.a>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-black text-white border-none text-[10px] font-heading font-bold uppercase tracking-widest px-4 py-2">
                    Chat with us
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default WhatsAppButton;
