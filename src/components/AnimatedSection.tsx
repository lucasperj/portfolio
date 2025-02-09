import { Box, BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps extends BoxProps {
    children: React.ReactNode;
    delay?: number;
}

const AnimatedSection = ({ children, delay = 0, ...props }: AnimatedSectionProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <Box
            component={motion.div}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay }}
            {...props}
        >
            {children}
        </Box>
    );
};

export default AnimatedSection; 