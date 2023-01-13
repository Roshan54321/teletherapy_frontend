import React from 'react'
import DashLayout from '../../components/Dashboard/DashLayout';
import Journal from '../../components/Journal'
import Head from 'next/head';

export default function JournalShow() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Head>
                <title>Journal | TeleCBT</title>
            </Head>
            <Journal />
        </div>
    )
}

JournalShow.getLayout = function getLayout(page) {
    return <DashLayout active="journal">{page}</DashLayout>;
};