import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Yup validation
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  shortDescription: yup.string().required("Short description is required"),
  content: yup.string().required("Blog content is required"),
});

const AddBlog = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [base64Image, setBase64Image] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 🔁 Convert image to base64
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    toast({
      title: "Image too large",
      description: "Please upload images under 1MB",
      status: "warning",
    });
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setBase64Image(reader.result);
  };
  reader.readAsDataURL(file);
};


  const onSubmit = async (data) => {
    if (!base64Image) {
      toast({
        title: "Please upload an image",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    try {
      setUploading(true);

      const payload = {
        ...data,
        blogImage: base64Image,
      };

      await axios.post("http://localhost:5000/api/blogs", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Blog posted successfully!",
        status: "success",
        isClosable: true,
      });

      reset();
      setBase64Image("");
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Failed to post blog",
        status: "error",
        isClosable: true,
      });
    } finally {
      setUploading(false);
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
          Add New Blog
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" {...register("title")} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.shortDescription}>
              <FormLabel>Short Description</FormLabel>
              <Textarea {...register("shortDescription")} rows={3} />
              <FormErrorMessage>{errors.shortDescription?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.content}>
              <FormLabel>Content</FormLabel>
              <Textarea {...register("content")} rows={6} />
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
              isLoading={isSubmitting || uploading}
            >
              {uploading ? "Uploading..." : "Post Blog"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default AddBlog;
