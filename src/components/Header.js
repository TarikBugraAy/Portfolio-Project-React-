import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, HStack, Link } from "@chakra-ui/react";
import {
  faEnvelope,
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="#18181b"
      color="white"
      zIndex={1}
      transition="transform 0.3s ease-in-out"
      transform={visible ? "translateY(0)" : "translateY(-200px)"}
    >
      <HStack p={4} spacing={8} justify="space-between" align="center">
        <nav>
          <HStack spacing={4}>
            {socials.map((social) => (
              <Link key={social.icon} href={social.url}>
                <FontAwesomeIcon icon={social.icon} size="2x" />
              </Link>
            ))}
          </HStack>
        </nav>
        <nav>
          <HStack spacing={8}>
            <Link onClick={() => handleClick("projects-section")}>Projects</Link>
            <Link onClick={() => handleClick("contactme-section")}>Contact Me</Link>
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};

export default Header;

