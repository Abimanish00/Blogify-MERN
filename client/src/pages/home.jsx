import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  HStack,
  Avatar,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useAuth();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data.slice(0, 6)); // show top 6
    } catch (err) {
      toast({
        title: "Failed to load blogs",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      px={{ base: 4, md: 20 }}
      py={10}
    >
      {/* Hero Section */}
      <Box
        textAlign="center"
        py={20} // ⬅️ Increase vertical padding
        px={6}
        bg="blue.100"
        _dark={{ bg: "blue.700" }}
        borderRadius="lg"
        mb={10}
      >
        <Heading
          size="2xl"
          fontWeight="bold"
          mb={4}
          color="blue.700"
          _dark={{ color: "blue.200" }}
        >
          Discover & Share Powerful Ideas
        </Heading>
        <Text
          fontSize="lg"
          mb={6}
          color="gray.600"
          _dark={{ color: "gray.300" }}
        >
          Dive into the world of modern blogs — crafted by real voices, shared
          with passion.
        </Text>

        <Button
          colorScheme="blue"
          size="lg"
          px={8}
          onClick={() => navigate("/login")}
          _hover={{ bg: "blue.300" }}
        >
          🚀 Explore Now
        </Button>
      </Box>

      {/* Latest Blogs */}
      <Heading mb={6} size="lg" color="gray.700" _dark={{ color: "gray.200" }}>
        🔥 Latest Blogs
      </Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : blogs.length === 0 ? (
        <Text>No blogs found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {blogs.map((blog) => (
            <Box
              key={blog._id}
              bg="white"
              _dark={{ bg: "gray.700" }}
              boxShadow="md"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
            >
              <Image
                src={blog.blogImage}
                alt={blog.title}
                w="100%"
                h="200px"
                objectFit="cover"
              />

              <Box p={5}>
                <HStack mb={2} spacing={3}>
                  <Avatar
                    size="sm"
                    name={blog.author?.username}
                    src={blog.author?.profileImg}
                  />
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                  >
                    {blog.author?.username} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>

                <Heading
                  size="md"
                  mb={2}
                  noOfLines={1}
                  color="gray.800"
                  _dark={{ color: "gray.100" }}
                >
                  {blog.title}
                </Heading>

                <Text
                  fontSize="sm"
                  color="gray.700"
                  _dark={{ color: "gray.300" }}
                  noOfLines={2}
                >
                  {blog.shortDescription}
                </Text>

                <Button
                  variant="link"
                  mt={3}
                  colorScheme="blue"
                  onClick={() => 
                    token ? navigate(`/blog/${blog._id}`) : navigate("/login")
                  }
                >
                  Read More →
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Home;
