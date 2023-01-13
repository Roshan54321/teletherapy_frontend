import React from 'react'
import DashLayout from '../../components/Dashboard/DashLayout';
import Pomodoro from '../../components/Pomodoro'
import Head from 'next/head';

export default function PomodoroTimer() {
    return (
        <div className="">
            <Head>
                <title>Pomodoro | TeleCBT</title>
            </Head>
            <Pomodoro />
        </div>
    )
}

PomodoroTimer.getLayout = function getLayout(page) {
    return <DashLayout active="pomodoro">{page}</DashLayout>;
};