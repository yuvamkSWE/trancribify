import React from 'react'
import PropTypes from 'prop-types'
import GradualSpacing from './ui/gradual-spacing'

export default function Transcribe(props) {
  return (

    <main className='flex items-center flex-col justify-center gap-10 md:gap-14 py-24'>

        <div className="flex flex-col gap-2 sm:gap-4">

            <h1 className='font-bold text-white text-xl sm:text-3xl md:text-5xl'>

                <span>
                    <GradualSpacing text={'Transcribifying your audio'}/>
                </span>

            </h1>

        </div>

    </main>
    
  )
}
