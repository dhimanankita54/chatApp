import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BiPowerOff } from 'react-icons/bi'
import { Button } from "@mui/material";

export const Logout = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <>  
            <Button onClick={handleClick}>
                <BiPowerOff style={{color: 'white', fontSize: '20px'}} />
            </Button>
        </>
    )
}