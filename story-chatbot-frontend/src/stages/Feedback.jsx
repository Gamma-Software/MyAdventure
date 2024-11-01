import { useState, useEffect} from 'react';
import { useColorModeValue, FormControl, VStack, Flex, FormLabel, Button, Textarea, Input, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Rating } from '@smastrom/react-rating';
import { useSubmit } from '../hooks/useSubmit';
import { useStory } from '../context/StoryContext';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { sendFeedbackToSlack } from '../utils/feedback';

export default function Feedback({setCurrentStage, isLoading}) {
    const formik = useFormik({
        initialValues: { ratings: {"How was the story?": 0, "How was the characters?": 0}, email: "", inputfeedback: "" },
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
                        <FormLabel>{question}</FormLabel>
                        <Rating style={{ maxWidth: 250 }} value={formik.values.ratings[question]} onChange={(e) => formik.setFieldValue('ratings', {...formik.values.ratings, [question]: e})} />
                    </Flex>
                ))}
                <FormControl isInvalid={formik.touched.feedback && formik.errors.feedback}>
                    <FormLabel>Any other feedback?</FormLabel>
                    <Textarea
                        placeholder='Details about your experience, give suggestions, etc.'
                        id="inputfeedback"
                        name="inputfeedback"
                        value={formik.values.inputfeedback}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </FormControl>
                <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                    id="email"
                    name="email"
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                </FormControl>
                <Button type="submit" colorScheme="green" isLoading={isLoading} loadingText='Loading...' rightIcon={<ArrowForwardIcon />} alignSelf={"end"}  >
                    Play Again
                </Button>
            </VStack>
        </form>
    )
}