import { useState } from "react"

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>  
        setValues({ ...values, [e.target.name]: e.target.value })
    
    return { 
        values, 
        onChange, 
    }
}