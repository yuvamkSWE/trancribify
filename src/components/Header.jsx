import React from 'react'
import GradualSpacing from '@/components/ui/gradual-spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className='flex items-center p-2 justify-between'>
        <GradualSpacing
          className=" text-xl font-bold text-white -tracking-wide"
          text="Transcribify"
        />
        <button className='flex items-center border p-2 rounded-full px-2'>
          <div className='text-white font-sans mx-2 font-bold'>New</div>
          <FontAwesomeIcon icon={faPlus} className='text-white text-xl px-1' />
        </button>
        </header>
  )
}
