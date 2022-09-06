import { Container, Box } from '@mantine/core';
import MainComp from "./homePages/MainComp";

function HomePages(){
    return (
        <>
            <Container fluid>
                <Box style={{ display:"flex", alignItems: "center", justifyContent:"center", height: "100vh" }}>
                    <MainComp/>
                </Box>
            </Container>
        </>
    )
}
    
export default HomePages
