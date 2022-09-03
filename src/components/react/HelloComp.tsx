import { Button } from '@mantine/core';

type HelloCompProps = {
    data?: string;
}
    
function HelloComp({ data }: HelloCompProps){
    return (
        <>
        <h1>Hello HelloComp</h1>
        <Button onClick={ () => console.log("Hello")}>
            Settings
        </Button>
        </>
    )
}
    
export default HelloComp
