import React from "react";
import {
  Box,
  Flex,
  Button,
  HStack,
  useToast,
  Spacer,
  Avatar,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();

    toast({
      title: "Logged out successfully",
      status: "success",
      isClosable: true,
    });

    navigate("/login");
  };

  return (
    <Box bg="white" _dark={{ bg: "gray.800" }} px={6} py={4} boxShadow="sm" position="sticky" top="0" zIndex="1000">
      <Flex alignItems="center">
        {/* Brand / Logo */}
        <Text
          fontWeight="bold"
          fontSize="xl"
          color="blue.600"
          _dark={{ color: "blue.300" }}
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          Blogify
        </Text>

        <Spacer />

        <HStack spacing={4}>
          <Button variant="ghost" as={RouterLink} to="/">
            Home
          </Button>

          {token && (
            <>
              <Button variant="ghost" as={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button variant="ghost" as={RouterLink} to="/add-blog">
                Add Blog
              </Button>
              <Button colorScheme="red" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {!token && (
            <>
              <Button variant="outline" colorScheme="blue" as={RouterLink} to="/login">
                Login
              </Button>
              <Button colorScheme="blue" as={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}

          {/* 🌗 Dark Mode Toggle */}
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            isRound
            size="sm"
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
