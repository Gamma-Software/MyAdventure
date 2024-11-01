import { useEffect } from 'react';
import { useStory } from '../context/StoryContext';
import Start from './Start';
import Play from './Play';
import Gameover from './Gameover';

export default function Playground() {
    const { currentStage } = useStory();
    useEffect(() => {
        console.log(currentStage);
    }, [currentStage]);
    return (
        <>
            <Start />
            <Play />
            <Gameover />
        </>
    )
}