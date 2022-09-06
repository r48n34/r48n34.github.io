import { motion } from "framer-motion"
import { Text } from '@mantine/core';

function MainComp(){
    return (
        <motion.div 
            style={{ margin:0, lineHeight: 0.8 }}
            onClick={ () => {
                !!window && window.open("https://www.r48n34.me/", '_blank')
            }}
        >
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
                animate={{ letterSpacing: ["2px", "10px"] }}
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
    )
}
    
export default MainComp
