import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      const { token } = res.data;

      // ✅ Save token to localStorage
      login(token);

      toast({
        title: "Logged in successfully!",
        status: "success",
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Login failed",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        w="100%"
        maxW="md"
        p={8}
        bg="white"
        _dark={{ bg: "gray.700" }}
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading
          textAlign="center"
          mb={6}
          color="blue.600"
          _dark={{ color: "blue.200" }}
        >
          Login to Your Account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    _focus={{ boxShadow: "none" }}
                    size="sm"
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              width="full"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
