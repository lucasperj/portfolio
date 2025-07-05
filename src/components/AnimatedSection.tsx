import { Box, BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps extends BoxProps {
    children: React.ReactNode;
    dataTestId?: string;
    delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, dataTestId }) => {
    return (
        <section data-test-id={dataTestId}>
            {children}
        </section>
    );
};

export default AnimatedSection; 