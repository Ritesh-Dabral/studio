import React from 'react'
import Tick from './tick.json'
import { useLottie } from "lottie-react";

export default function Lottie(props) {
    const {animationData=Tick, loop=true} = props;
    const options = {
        "animationData": animationData,
        "loop": loop
    };
    const { View } = useLottie(options);
    return <>{View}</>;
}
