import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Image,
  Avatar,
  Text,
  HStack,
  useToast,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = showMyBlogs
        ? "http://localhost:5000/api/blogs/user/me"
        : "http://localhost:5000/api/blogs";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(res.data);
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
    if (!token) {
      navigate("/login");
      return;
    }

    fetchBlogs();
  }, [showMyBlogs, token]);

  const handleAddBlog = () => {
    navigate("/add-blog");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Blog deleted successfully",
        status: "success",
        isClosable: true,
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Failed to delete blog",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      py={10}
      px={{ base: 4, md: 20 }}
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        mb={8}
      >
        <Heading size="lg" color="gray.800" _dark={{ color: "gray.200" }}>
          {showMyBlogs ? "📂 My Blogs" : "📰 All Blogs"}
        </Heading>

        <HStack spacing={4}>
          <Button
            colorScheme={showMyBlogs ? "gray" : "blue"}
            variant={showMyBlogs ? "outline" : "solid"}
            onClick={() => setShowMyBlogs(false)}
          >
            All Blogs
          </Button>
          <Button
            colorScheme={showMyBlogs ? "blue" : "gray"}
            variant={showMyBlogs ? "solid" : "outline"}
            onClick={() => setShowMyBlogs(true)}
          >
            My Blogs
          </Button>
          <Button colorScheme="green" onClick={handleAddBlog}>
            ➕ Add Blog
          </Button>
        </HStack>
      </Stack>

      {loading ? (
        <Spinner size="xl" />
      ) : blogs.length === 0 ? (
        <Text color="gray.600" _dark={{ color: "gray.300" }}>
          No blogs found.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {blogs.map((blog) => (
            <Box
              key={blog._id}
              bg="white"
              color="gray.800"
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
                  <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
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
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More →
                </Button>

                {showMyBlogs && (
                  <HStack justify="space-between" mt={4}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Dashboard;
