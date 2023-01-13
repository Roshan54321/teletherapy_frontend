import React from 'react'
import Routine from '../../components/Routine'
import DashLayout from '../../components/Dashboard/DashLayout';
import Head from 'next/head';

export default function RoutineShow() {
    return (
        <div className='flex text-white justify-center items-center min-h-screen'>
            <Head>
                <title>Routine | TeleCBT</title>
            </Head>
            <Routine />
        </div>
    )
}

RoutineShow.getLayout = function getLayout(page) {
    return <DashLayout active="routine">{page}</DashLayout>;
};