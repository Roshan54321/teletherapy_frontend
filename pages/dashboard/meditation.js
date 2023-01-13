import React from 'react';
import DashLayout from '../../components/Dashboard/DashLayout';
import Head from 'next/head';

export default function Meditation() {
  return (
    <div className="flex text-white flex-col  ">
      <Head>
        <title>Meditation | TeleCBT</title>
      </Head>
      <div className=" h-[500px] w-full relative rounded-2xl overflow-hidden grid grid-cols-4 pl-[50px] place-content-center ">
        <img
          src={'/images/scene4.jpg'}
          className="absolute w-full h-[500px] inset-0 object-cover  "
          fill
        />
        <div className="bg-gradient-to-r from-black to-transparent w-full h-[500px] absolute inset-0"></div>
        <div className="relative col-span-2">
          <div className=" text-white font-[700] text-[50px] ">Meditation:</div>
          <p className="text-white text-[25px] font-[700]">
            Mindfulness allows us to live life fully. Fully aware, fully awake,
            fully alive.
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-10 ">
        <div className="text-white font-[700] text-[24px]">RELAX NOW</div>
        <div className="text-white/60 font-[600] text-[16px] ">
          Explore classic methods of relaxation.
        </div>
        <div className="flex gap-3 mt-3 ">
          <div className="w-1/4 h-[200px] bg-white rounded-2xl overflow-hidden relative flex justify-center items-end cursor-pointer">
            <img
              src={'/images/scene4.jpg'}
              className="absolute w-full h-[200px] inset-0 object-cover rounded-2xl "
              fill
            />
            <div className="inset-0 absolute bg-gradient-to-b from-transparent to-black/80 w-full "></div>
            <div className="relative font-[700] text-[25px] pb-10 text-white">
              Deep Breathing
            </div>
          </div>

          <div className="w-1/4 h-[200px] bg-white rounded-2xl overflow-hidden relative flex justify-center items-end cursor-pointer">
            <img
              src={'/images/med1.jpg'}
              className="absolute w-full h-[200px] inset-0 object-cover rounded-2xl "
              fill
            />
            <div className="inset-0 absolute bg-gradient-to-b from-transparent to-black/80 w-full "></div>
            <div className="relative font-[700] text-[25px] pb-10 text-white">
              Relaxing Sleep
            </div>
          </div>

          <div className="w-1/4 h-[200px] bg-white rounded-2xl overflow-hidden relative flex justify-center items-end cursor-pointer">
            <img
              src={'/images/med2.jpg'}
              className="absolute w-full h-[200px] inset-0 object-cover rounded-2xl "
              fill
            />
            <div className="inset-0 absolute bg-gradient-to-b from-transparent to-black/80 w-full "></div>
            <div className="relative font-[700] text-[25px] pb-10 text-white">
              Healing
            </div>
          </div>

          <div className="w-1/4 h-[200px] bg-white rounded-2xl overflow-hidden relative flex justify-center items-end cursor-pointer">
            <img
              src={'/images/med3.jpg'}
              className="absolute w-full h-[200px] inset-0 object-cover rounded-2xl "
              fill
            />
            <div className="inset-0 absolute bg-gradient-to-b from-transparent to-black/80 w-full "></div>
            <div className="relative font-[700] text-[25px] pb-10 text-white">
              Anxiety Relief
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Meditation.getLayout = function getLayout(page) {
  return <DashLayout active="meditation">{page}</DashLayout>;
};
