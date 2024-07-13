import { useEffect } from "react"

const Fallback =  () => {
    

    useEffect(() => {
        
    }, []);


    return (
        <div className="fallback-container" >
            <h2>Fallback page</h2>
        </div>
    )

}


export default Fallback;