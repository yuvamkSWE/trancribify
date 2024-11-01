import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'

export default function HomePage(props) {

  const {setAudio , setFile} = props;

  return (

    <main className='flex-1 p-4 flex flex-col gap-3 justify-center items-center '>    
      <h1 className="text-white text-4xl font-medium sm:text-6xl " >Transcribify</h1>

      <p className="text-white text-[16px] my-3 sm:text-xl">
        A powerful and user-friendly tool to transcribe audio
      </p>

      <button className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
        Start Transcribing
        <FontAwesomeIcon icon={faMicrophone} className='pl-5' > </FontAwesomeIcon>
      </button>

      <p className='text-white'> Or 
        <label className='text-blue cursor-pointer text-purple-400 duration-200'> Upload 
                      <input onChange={(e)=>{
                        setFile(e.target.files[0]);
                      }} className='hidden' type='file' accept='.mp3,.wave' />  
        </label>
        <label > or a MP3 file <FontAwesomeIcon icon={faFileAudio} /> </label>
      </p>

      
        
    </main>
  )

}
