import { Stack, Text, Button, Box, Flex, Icon } from '@chakra-ui/react';
import { useTranslationContext } from '../context/TranslationContext';
import { DisplayCredits } from './CreditsModel';

export default function Footer() {
    const { t } = useTranslationContext();
    return (
        <>
            <Box>
                <Flex alignItems="center" justifyContent="space-between">
                    {/* Placeholder box to push content to center */}
                    <Box w="33%" />

                    {/* Centered Text */}
                    <Text fontSize="sm">Made with ❤️ by <a href="https://www.linkedin.com/in/rudloffvalentin/">Valentin RUDLOFF</a></Text>

                    {/* Button on the Right */}
                    <Box w="33%" textAlign="right">
                        <Icon style={{ cursor: 'pointer' }} mr={2} onClick={() => {
                            DisplayCredits({
                                title: t('credits_title'),
                                message: t('credits_message1') + t('credits_message2') + t('credits_message3'),
                                okText: 'Continue',
                                cancelText: 'Close',
                                confirmColor: 'primary',
                                onOk() {},
                                onCancel() {},
                            });
                        }} />
                    </Box>
                </Flex>
            </Box>
        </>
    );
}