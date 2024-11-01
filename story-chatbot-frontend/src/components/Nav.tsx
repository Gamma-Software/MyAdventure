'use client'

import React, { useRef, useState } from 'react';
import {
  Box,
  Flex,
  Select,
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
  Image,
  useColorMode,
  Center,
  Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, ArrowBackIcon, RepeatIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useStory } from '../context/StoryContext'
import { useTranslationContext } from '../context/TranslationContext';
import { Confirm } from  "../components/QuitgameDialog";
import { DisplayStory } from "../components/StoryModel";


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
    const { messages, currentStage, setCurrentStage, endStoryCallback, updateLanguage } = useStory();
    const { colorMode, toggleColorMode } = useColorMode();
    const { t, changeLanguage, currentLanguage } = useTranslationContext();
    const bgBox = useColorModeValue('gray.100', 'gray.900');
    const bgButton = useColorModeValue('gray.200', 'gray.700');

    const handleQuit = () => {
        Confirm({
        title: "Quit Game?",
        message: "Are you sure you want to quit the game?",
        okText: 'Yes',
        cancelText: 'No',
        confirmColor: 'primary',
        onOk() {
            setCurrentStage('start');
            endStoryCallback();
        },
        onCancel() {},
        });
    };

    const handleRepeat = () => {
        Confirm({
        title: "Restart Game?",
        message: "Are you sure you want to restart the game?",
        okText: 'Yes',
        cancelText: 'No',
        confirmColor: 'primary',
        onOk() {
            endStoryCallback();
            setCurrentStage('play');
        },
        onCancel() {},
        });
    };

    const handleUpDown = () => {
        const msg = messages.map((message, index) => {
            return message.role !== "user" ? (
                message.content
            ) : null
        }).join('\n');

        DisplayStory({
        title: "Story and Choices",
        message: msg,
        okText: 'Continue',
        cancelText: 'Close',
        confirmColor: 'primary',
        onOk() {},
        onCancel() {},
        });
    };




    return (
        <>
        <Box bg={bgBox} px={4}>
            <Flex h={"64px"} alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'}>
                <Image src="/logo.svg" alt="Logo" boxSize="40px" mr={4} />
                <Heading size='md' textAlign={'center'} mr={4}>MyAdventure</Heading>
                {currentStage === "play" ? (
                    <Stack direction={'row'} spacing={2}>
                        <Button onClick={handleQuit} bg={bgButton}>
                        <ArrowBackIcon />
                    </Button>
                    <Button onClick={handleRepeat} bg={bgButton}>
                        <RepeatIcon />
                    </Button>
                    {(messages.length > 1 && currentStage === "play") ? (
                    <Button onClick={handleUpDown} bg={bgButton}>
                        <HamburgerIcon />
                    </Button>
                    ) : null}
                </Stack>
                ) : null}
            </Flex>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    {currentStage === "start" && <Select variant='flushed' onChange={(e) => {
                        changeLanguage(e.target.value);
                        updateLanguage(e.target.value);
                    }}>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                    </Select>}
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>

                {/* <Menu>
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
                </Menu> */}
                </Stack>
            </Flex>
            </Flex>
        </Box>
        </>
    )
}