import React, { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import File from './components/File';

export default function App() {
  // State variables to store file and audio data
  const [file, setFile] = useState(null);   // Holds uploaded file data, initially null
  const [audio, setAudio] = useState(null); // Holds audio blob for recording, initially null

  // `audioAvailable` is true if either `file` or `audio` is not null
  const audioAvailable = file || audio;

  // Function to reset file and audio states to null, clearing the data
  function handleReset() {
    setFile(null);
    setAudio(null);
  }

  return (
    <div className='flex flex-col '>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {audioAvailable ? (
          // Renders `File` component if there’s audio or file data
          <File file={file} audio={setAudio} handleReset={handleReset} />
        ) : (
          // Otherwise, renders the `HomePage` component
          <HomePage setFile={setFile} setAudio={setAudio}/>
        )}
      </section>
    </div>
  )
}
