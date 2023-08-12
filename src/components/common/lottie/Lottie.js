import React from 'react'
import Tick from './tick.json'
import DownPointer from './downPointer.json'
import { useLottie } from "lottie-react";

export default function Lottie(props) {
    const {animationName="tick", loop=true} = props;
    const animations = {
        "tick": Tick,
        "downPointer": DownPointer
    };
    const options = {
        "animationData": animations[animationName],
        "loop": loop
    };
    const { View } = useLottie(options);
    return <>{View}</>;
}
