// Card.js
import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      align="start"
      spacing={4}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      color="#14532d"
    >
      <Image src={imageSrc} alt={title} borderRadius="md" />
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      <Text>{description}</Text>
      <HStack align="center">
        <Text>Learn more</Text>
        <FontAwesomeIcon icon={faArrowRight} size="1x" />
      </HStack>
    </VStack>
  );
};

export default Card;

