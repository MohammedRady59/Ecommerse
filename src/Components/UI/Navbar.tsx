import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { ReactNode } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import CookiesServise from "../../service/CookiesServise";
import DrawerCart from "../DrawerCart";

interface IProps {
  children: ReactNode;
  move: string;
}
const isAllow = CookiesServise.get("jwt");

const Links: string[] = ["Products", ...(isAllow ? ["Dashboard"] : [])];

const Nav = ({ children, move }: IProps) => {
  return (
    <Box
      to={move.toLowerCase()}
      as={RouterNavLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  function handleLogout() {
    CookiesServise.remove("jwt");
    window.location.reload();
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/"}>Store</Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Nav key={link} move={link}>
                  {link}
                </Nav>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <Moon /> : <Sun />}
              </Button>

              <DrawerCart />
              {isAllow ? (
                <>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <Box
                  to={"/login"}
                  as={RouterNavLink}
                  px={2}
                  py={2}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Admin
                </Box>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
