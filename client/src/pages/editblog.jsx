import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  VStack,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  shortDescription: yup.string().required("Short description is required"),
  content: yup.string().required("Content is required"),
});

const EditBlog = () => {
  const { id } = useParams(); // blog ID from URL
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [base64Image, setBase64Image] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch blog by ID and pre-fill fields
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      const blog = res.data;

      setValue("title", blog.title);
      setValue("shortDescription", blog.shortDescription);
      setValue("content", blog.content);
      setBase64Image(blog.blogImage);
    } catch (err) {
      toast({
        title: "Failed to load blog",
        status: "error",
        isClosable: true,
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBlog();
    }
  }, [id]);

  // Handle image update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        blogImage: base64Image,
      };

      await axios.put(`http://localhost:5000/api/blogs/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Blog updated successfully!",
        status: "success",
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Update failed",
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
    mt={5}
    mb={5}
    p={8}
    bg="white"
    _dark={{ bg: "gray.700" }}
    boxShadow="lg"
    borderRadius="md"
      >
        <Heading size="lg" mb={6} textAlign="center" color="blue.600" _dark={{ color: "blue.200" }}>
          ✏️ Edit Blog
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.title}>
                <FormLabel>Title</FormLabel>
                <Input type="text" {...register("title")} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.shortDescription}>
                <FormLabel>Short Description</FormLabel>
                <Textarea rows={3} {...register("shortDescription")} />
                <FormErrorMessage>{errors.shortDescription?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.content}>
                <FormLabel>Content</FormLabel>
                <Textarea rows={6} {...register("content")} />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
  <FormLabel>Upload Blog Image</FormLabel>

  <Box
    border="2px dashed"
    borderColor="gray.300"
    _dark={{ borderColor: "gray.600" }}
    borderRadius="md"
    p={4}
    textAlign="center"
    cursor="pointer"
    role="button"
    onClick={() => document.getElementById("blog-image").click()}
    _hover={{ bg: "gray.50", _dark: { bg: "gray.700" } }}
  >
    <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
      Click to choose image
    </Text>
    {base64Image && (
      <Image
        src={base64Image}
        alt="Preview"
        mt={4}
        mx="auto"
        maxH="200px"
        borderRadius="md"
      />
    )}
  </Box>

  <Input
    type="file"
    id="blog-image"
    accept="image/*"
    display="none"
    onChange={handleImageChange}
  />
</FormControl>


              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default EditBlog;
