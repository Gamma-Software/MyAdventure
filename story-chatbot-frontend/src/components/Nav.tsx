'use client'

import React, { useRef, useState } from 'react';
import {
  Box,
  Flex,
  Text,
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
  Heading,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialog,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton
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
  const [dialogType, setDialogType] = useState('');
  const cancelRef = useRef();
  const { messages, currentStage, setCurrentStage } = useStory();


  const handleBack = () => {
    setDialogType("back");
    onOpen();
  };

  const handleRepeat = () => {
    setDialogType("repeat");
    onOpen();
  };

  const handleUpDown = () => {
    setDialogType("updown");
    onOpen();
  };

  const handleQuitReset = () => {
    onClose();
    setDialogType("");
    setCurrentStage('start');
  };

  const dialogInstance = dialogType === "back" || dialogType === "repeat" ? (
    <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{dialogType === "back" ? "Quit Game?" : "Repeat Game?"}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to {dialogType === "back" ? "quit" : "repeat"} the game?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={dialogType === "back" ? handleQuitReset : handleQuitReset}>
              Yes
            </Button>
          </AlertDialogFooter>
          </AlertDialogContent>
    </AlertDialog>
  ) : null;

  const modalInstance = dialogType === "updown" ? (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Story and Choices</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            {messages.map((message, index) => (
                message.role !== "user" ? (
                    message.content
                ) : null
            ))}
        </ModalBody>

        <ModalFooter>
        <Button colorScheme='blue' mr={3}>
            Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
  ) : null;

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={"64px"} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Heading size='md' textAlign={'center'} mr={4}>MyAdventure</Heading>
            {currentStage === "play" ? (
                <Stack direction={'row'} spacing={2}>
                    <Button onClick={handleBack} bg={useColorModeValue('gray.200', 'gray.700')}>
                    <ArrowBackIcon />
                </Button>
                <Button onClick={handleRepeat} bg={useColorModeValue('gray.200', 'gray.700')}>
                    <RepeatIcon />
                </Button>
                {(messages.length > 1 && currentStage === "play") ? (
                <Button onClick={handleUpDown} bg={useColorModeValue('gray.200', 'gray.700')}>
                    <HamburgerIcon />
                </Button>
                ) : null}
              </Stack>
            ) : null}
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
      {dialogInstance}
      {modalInstance}
    </>
  )
}