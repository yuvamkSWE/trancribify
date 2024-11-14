import React from 'react'
import GradualSpacing from './ui/gradual-spacing'

export default function Result() {
  return (
    <main className='flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 py-24'>

        <div className="flex flex-col gap-2 sm:gap-4 text-center text-white">

            <h1 className='font-bold text-white text-xl sm:text-3xl md:text-5xl'>

                <span>
                    <GradualSpacing text={'Transcribified'}/>
                </span>

            </h1>

        </div>

       

    </main>
  )
}
