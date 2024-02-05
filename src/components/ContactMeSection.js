// Import React and necessary Chakra UI components
import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

// Define the ContactMeSection component
const ContactMeSection = () => {
  // Destructure properties from useSubmit and useAlertContext hooks
  const { isLoading, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Define the formik object using the useFormik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    // Implement the onSubmit function
    onSubmit: async (values) => {
      try {
        const submitResponse = await submit("api-url", values); // Replace "api-url" with the actual API endpoint
    
        // Check if the submission was successful
        if (submitResponse && submitResponse.type === "success") {
          // Display success alert and reset the form
          onOpen({
            title: "Success!",
            description: `Thank you, ${values.firstName}! Your message has been submitted successfully.`,
          });
          formik.resetForm();
        } else {
          // Display error alert
          onOpen({
            title: "Oops!",
            description: submitResponse.message || `Something went wrong, please try again later!`,
          });
    
          console.error("API Submission Error:", submitResponse);
        }
      } catch (error) {
        // Display error alert for any unexpected errors
        onOpen({
          title: "Oops!",
          description: `An error occurred while submitting the form. Please try again later!`,
        });
    
        console.error("Error submitting the form:", error);
      }
    },
    
    // Define validation schema using Yup
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string().optional(),
      comment: Yup.string().min(25, "Must be at least 25 characters").required("Required"),
    }),
  });

  // Return the UI elements
  return (
    <FullScreenSection isDarkBackground backgroundColor="#512DA8" py={16} spacing={8}>
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* FormControl for Name field */}
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              {/* FormControl for Email field */}
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              {/* FormControl for Type of Enquiry dropdown */}
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  color="black" // Set the text color to black
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              {/* FormControl for Comment field */}
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              {/* Submit Button */}
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

// Export the ContactMeSection component
export default ContactMeSection;
