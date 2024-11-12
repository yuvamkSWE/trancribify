import React from 'react'
import PropTypes from 'prop-types'
import GradualSpacing from './ui/gradual-spacing'

export default function Transcribe(props) {

  const { downloading } = props;


  return (

    <main className='flex items-center flex-col justify-center gap-10 md:gap-14 py-24'>

        <div className="flex flex-col gap-2 sm:gap-4 text-white">

            <h1 className='font-bold text-white text-xl sm:text-3xl md:text-5xl'>

                <span>
                    <GradualSpacing text={'Transcribifying your audio'}/>
                </span>

            </h1>

            <p className='font-semibold pl-1'>
                {!downloading ? 'Started downloading' : 'Downloading'}
            </p>

        </div>

        <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full'>
                {[0, 1, 2].map(val => {
                    return (
                        <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-200 loading ' + `loading${val}`}></div>
                    )
                })}
                {[0, 1].map(val => {
                    return (
                        <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-200 loading ' + `loading${val}`}></div>
                    )
                })}
        </div>

    </main>
    
  )
}
