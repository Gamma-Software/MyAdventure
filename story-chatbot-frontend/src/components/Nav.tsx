'use client'

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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, ArrowBackIcon, RepeatIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useStory } from '../context/StoryContext'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setCurrentStage } = useStory();
  const handleBack = () => {
    setCurrentStage('start');
  };

  const handleRepeat = () => {
    setCurrentStage('start');
  };

  const handleUpDown = () => {
    console.log('updown');
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={"64px"} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Heading size='md' textAlign={'center'} mr={4}>MyAdventure</Heading>
            <Stack direction={'row'} spacing={2}>
              <Button onClick={handleBack} bg={useColorModeValue('gray.200', 'gray.700')}>
                <ArrowBackIcon />
              </Button>
              <Button onClick={handleRepeat} bg={useColorModeValue('gray.200', 'gray.700')}>
                <RepeatIcon />
              </Button>
              <Button onClick={handleUpDown} bg={useColorModeValue('gray.200', 'gray.700')}>
                <HamburgerIcon />
              </Button>
            </Stack>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
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
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}