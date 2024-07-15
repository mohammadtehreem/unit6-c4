import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [input, setInput] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://unit6-c4.onrender.com/login", {
        username: input.userName,
        password: input.password,
      });

      toast({
        title: "Login successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("loggedIn", JSON.stringify(response.data));
      navigate("/");
      return;
    } catch (error) {
      console.error("Error fetching user credentials:", error);
      toast({
        title: "Login failed.",
        description: "Wrong email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="login-section">
      <form onSubmit={handleLogin}>
        <VStack spacing={4} bg="white">
          <Heading>Login</Heading>
          <FormControl isRequired bg="white">
            <FormLabel bg="white">Username</FormLabel>
            <Input
              type="username"
              name="userName"
              placeholder="Username for eg: admin"
              value={input.username}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              style={{ border: "1px solid" }}
            />
          </FormControl>
          <FormControl isRequired bg="white">
            <FormLabel bg="white">Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password for eg: admin"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                style={{ border: "1px solid" }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link to="/signup"></Link>
          <Button
            isLoading={loading}
            loadingText="Logging in"
            type="submit"
            colorScheme="blue"
            width="full"
          >
            Login
          </Button>
          <Text mt={4} textAlign="center" bg="white">
            Don't have an account?{" "}
            <Link to="/signup">
              <Text as="u" color="blue.500">
                Sign Up
              </Text>
            </Link>
          </Text>
        </VStack>
      </form>
    </div>
  );
}
