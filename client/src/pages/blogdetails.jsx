import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  Avatar,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      toast({
        title: "Blog not found",
        status: "error",
        isClosable: true,
      });
      navigate("/"); // fallback if blog doesn't exist
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!blog) return null;

  return (
    <Box px={{ base: 4, md: 20 }} py={10} bg="gray.50" _dark={{ bg: "gray.900" }} minH="100vh">
  <Image
    src={blog.blogImage}
    alt={blog.title}
    w="100%"
    maxH="400px"
    objectFit="cover"
    borderRadius="md"
    mb={6}
  />

  <VStack align="start" spacing={4} color="gray.800" _dark={{ color: "gray.100" }}>
    <HStack spacing={4}>
      <Avatar size="md" src={blog.author?.profileImg} name={blog.author?.username} />
      <Box>
        <Text fontWeight="bold">{blog.author?.username}</Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          {new Date(blog.createdAt).toLocaleDateString()}
        </Text>
      </Box>
    </HStack>

    <Heading size="lg">{blog.title}</Heading>

    <Text fontSize="md" whiteSpace="pre-wrap">
      {blog.content}
    </Text>
  </VStack>
</Box>

  );
};

export default BlogDetails;
