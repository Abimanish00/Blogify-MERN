import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Heading,
  VStack,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
  useToast,
  Avatar,
  Text,
  HStack,
  Select,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Country, State, City } from "country-state-city";

// ✅ Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a 10-digit phone number")
    .required(),
  profession: yup.string().required("Profession is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
  profileImg: yup.string().required("Profile image is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Please accept the terms"),
});

const Register = () => {
  const { login, token } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  // ✅ Location state
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // ✅ Image preview
  const [previewImg, setPreviewImg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Load countries
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
      setSelectedState("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  // ✅ Styled Base64 Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setValue("profileImg", base64);
      setPreviewImg(base64);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        country: data.country,
        state: data.state,
        city: data.city,
        profileImg: data.profileImg,
        profession: data.profession,
        phone: data.phone,
      };

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      toast({
        title: "Registration successful! Please login.",
        status: "success",
        isClosable: true,
      });

      navigate("/login"); // ✅ Go to login instead of dashboard
    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Registration failed",
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
        <Heading
          textAlign="center"
          mb={6}
          color="blue.600"
          _dark={{ color: "blue.200" }}
        >
          Create Your Account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.profileImg}>
              <FormLabel>Profile Image</FormLabel>

              <Box
                border="2px dashed"
                borderColor="gray.300"
                _dark={{ borderColor: "gray.600" }}
                borderRadius="md"
                p={4}
                textAlign="center"
                cursor="pointer"
                role="button"
                onClick={() => document.getElementById("profile-image").click()}
                _hover={{ bg: "gray.50", _dark: { bg: "gray.700" } }}
              >
                <Text
                  fontSize="sm"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                >
                  Click to choose profile image
                </Text>

                {previewImg && (
                  <Image
                    src={previewImg}
                    alt="Preview"
                    mt={4}
                    mx="auto"
                    maxH="150px"
                    borderRadius="full"
                  />
                )}
              </Box>

              <Input
                type="file"
                id="profile-image"
                accept="image/*"
                display="none"
                onChange={handleImageUpload}
              />

              <FormErrorMessage>{errors.profileImg?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input {...register("username")} />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phone}>
              <FormLabel>Phone Number</FormLabel>
              <Input {...register("phone")} />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.profession}>
              <FormLabel>Profession</FormLabel>
              <Input {...register("profession")} />
              <FormErrorMessage>{errors.profession?.message}</FormErrorMessage>
            </FormControl>

            {/* Country Dropdown */}
            <FormControl isInvalid={errors.country}>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select Country"
                {...register("country")}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setValue("country", e.target.value);
                }}
              >
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
            </FormControl>

            {/* State Dropdown */}
            <FormControl isInvalid={errors.state}>
              <FormLabel>State</FormLabel>
              <Select
                placeholder="Select State"
                {...register("state")}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setValue("state", e.target.value);
                }}
              >
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
            </FormControl>

            {/* City Dropdown */}
            <FormControl isInvalid={errors.city}>
              <FormLabel>City</FormLabel>
              <Select placeholder="Select City" {...register("city")}>
                {cities.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
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

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowConfirm(!showConfirm)}
                    _focus={{ boxShadow: "none" }}
                    size="sm"
                  >
                    {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.terms}>
              <HStack align="start">
                <input
                  type="checkbox"
                  {...register("terms")}
                  id="terms"
                  style={{ marginTop: "0.35rem" }}
                />
                <FormLabel htmlFor="terms" fontSize="sm" mb={0}>
                  I agree to the <strong>Terms and Conditions</strong>
                </FormLabel>
              </HStack>
              <FormErrorMessage>{errors.terms?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              width="full"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
