type TestCompProps = {
    data?: string;
}
    
function TestComp({ data }: TestCompProps){
    return (
        <>
        <div>
        <h1>Hello TestComp {data}</h1>
        </div>
        </>
    )
}
    
export default TestComp
