import { useState, useEffect} from 'react';
import { useColorModeValue, FormControl, VStack, Flex, FormLabel, Button, Textarea, Input, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Rating } from '@smastrom/react-rating';
import { useSubmit } from '../hooks/useSubmit';
import { useStory } from '../context/StoryContext';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { sendFeedbackToSlack } from '../utils/feedback';
import { useTranslationContext } from '../context/TranslationContext';

export default function Feedback({setCurrentStage, isLoading, messages, llm}) {
    const { t } = useTranslationContext();
    const formik = useFormik({
        initialValues: { ratings: {"story": 0, "characters": 0}, email: "", inputfeedback: "", messages: messages, llm: llm },
        onSubmit: values => {
            sendFeedbackToSlack(values).then(() => {
                setCurrentStage('start');
                formik.resetForm();
            }).catch(error => {
                setCurrentStage('start');
                formik.resetForm();
            });
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid address email"),
            feedback: Yup.string()
        }),
    });
    const questions = Object.keys(formik.values.ratings)

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} alignItems='stretch'>
                {questions.map((question, index) => (
                    <Flex key={index} justifyContent={'space-between'} alignItems={'center'}>
                        <FormLabel>{t(`feedback_q${index + 1}`)}</FormLabel>
                        <Rating style={{ maxWidth: 250 }} value={formik.values.ratings[question]} onChange={(e) => formik.setFieldValue('ratings', {...formik.values.ratings, [question]: e})} />
                    </Flex>
                ))}
                <FormControl isInvalid={formik.touched.feedback && formik.errors.feedback}>
                    <FormLabel>{t('feedback_q3')}</FormLabel>
                    <Textarea
                        placeholder={t('feedback_q3_placeholder')}
                        id="inputfeedback"
                        name="inputfeedback"
                        value={formik.values.inputfeedback}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </FormControl>
                <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                    <FormLabel>{t('feedback_email')}</FormLabel>
                    <Input
                    id="email"
                    name="email"
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                </FormControl>
                <Button type="submit" colorScheme="green" isLoading={isLoading} loadingText='Loading...' rightIcon={<ArrowForwardIcon />} alignSelf={"end"}  >
                    {t('feedback_submit')}
                </Button>
            </VStack>
        </form>
    )
}