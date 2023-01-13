import React from 'react'
import DashLayout from '../../components/Dashboard/DashLayout';
import Breathing from '../../components/Breathing'
import Head from 'next/head';

export default function BreathingTimer() {
    return (
        <div className='absolute inset-0 mt-[400px]'>
            <Head>
                <title>Breathing | TeleCBT</title>
            </Head>
            <Breathing />
        </div>
    )
}

BreathingTimer.getLayout = function getLayout(page) {
    return <DashLayout active="breathing">{page}</DashLayout>;
};