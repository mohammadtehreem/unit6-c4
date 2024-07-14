import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/action";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export function Dashboard(){
    const dispatch = useDispatch();
    const DomUpdate = useSelector(state => state.DomUpdate)
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(()=>{
        dispatch(fetchData());
    },[DomUpdate.status])
    
    return(<div>
        <div className="dashboard-header">
        <Heading mx={"auto"} >Dashboard</Heading>
        
        
        <Button onClick={()=>{
            navigate("/login");
            toast({
                title: "Signing out",
                status: "info",
                isClosable: true,
                duration:3000
              }) 
            localStorage.removeItem("loggedIn")
        }} >Sign out</Button>
        </div>
        
    </div> )
}