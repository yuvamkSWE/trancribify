import React, { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import File from './components/File';

export default function 
() {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);

  const audioAvailable = file || audio;

  function handleReset() {
    setFile(null);
    setAudio(null);
  }


  return (
    <div className='flex flex-col '>

      <section className='min-h-screen flex flex-col'>
        <Header />
        {audioAvailable ? (
          <File file={file} audio={setAudio} handleReset={handleReset} />
        ) : (
          <HomePage setFile={setFile} setAudio={setAudio}/>
        )}
      </section>
      
    </div>
  )
}
