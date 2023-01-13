import React from 'react'
import DashLayout from '../../components/Dashboard/DashLayout';
import Head from 'next/head';

export default function Meditation() {
    return (
        <div className='flex text-white justify-center items-center min-h-screen'>
            <Head>
                <title>Meditation | TeleCBT</title>
            </Head>
            Meditation
        </div>
    )
}

Meditation.getLayout = function getLayout(page) {
    return <DashLayout active="meditation">{page}</DashLayout>;
};