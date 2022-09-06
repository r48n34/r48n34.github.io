import { motion } from "framer-motion"
import { Text } from '@mantine/core';
import { Slide } from "react-awesome-reveal";

function MainComp(){
    return (
        <Slide duration={2000} >
        <motion.div 
            style={{ margin:0, lineHeight: 0.8, cursor: "pointer" }}
            onClick={ () => {
                !!window && window.open("https://www.r48n34.me/", '_blank')
            }}
        >
            <motion.h3
                style={{ margin:0, textAlign: "right", marginBottom: "-26px" }}
                animate={{ letterSpacing: ["2px", "4px"] }}
                transition={{ ease: "easeInOut", duration: 3, repeat: Infinity, repeatType:"reverse" }}
            >
                <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                >
                    r48n34.me
                </Text>
            </motion.h3>

            <motion.h1
                style={{ margin:0 }}
                animate={{ wordSpacing: ["2px", "15px"] }}
                transition={{ ease: "easeInOut", duration: 4, repeat: Infinity, repeatType:"reverse" }}
            >
                <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                >
                    WELCOME TO
                </Text>
            </motion.h1>

            <motion.h2
                style={{ marginTop: "-26px" }}
                // animate={{ wordSpacing: ["2px", "15px"] }}
                animate={{ letterSpacing: ["2px", "8px"] }}
                transition={{ ease: "easeInOut", duration: 4, repeat: Infinity, repeatType:"reverse" }}
            >
                <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                >
                    REEEEE Studio
                </Text>
            </motion.h2>
        </motion.div>
        </Slide>
    )
}
    
export default MainComp
