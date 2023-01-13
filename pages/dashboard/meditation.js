import React from 'react'
import DashLayout from '../../components/Dashboard/DashLayout';
import Head from 'next/head';

export default function Meditation() {
    return (
        <div className='min-h-screen'>
            <Head>
                <title>Meditation | TeleCBT</title>
            </Head>
            <div className="flex justify-between px-20">
                <div className="flex flex-col gap-10">
                    <div className="video">
                        <iframe width="500" height="315" src="https://www.youtube.com/embed/w4tlGeSrcNw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="video">
                        <iframe width="500" height="315" src="https://www.youtube.com/embed/OKT_MzehvF4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
                <div className="flex justify-center w-full mt-5">
                    <audio controls>
                        <source src="/meditation1.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    )
}

Meditation.getLayout = function getLayout(page) {
    return <DashLayout active="meditation">{page}</DashLayout>;
};