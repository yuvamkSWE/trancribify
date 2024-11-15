
import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import File from './components/File';
import Transcribe from './components/Transcribe';
import Result from './components/Result';



export default function App() {


  //Store file/audio

  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(null);


  const audioAvailable = file || audio;



  function handleReset() { //To reset file/audio
    setFile(null);
    setAudio(null);
  }

  return (
    <div className='flex flex-col '>
      <section className='min-h-screen flex flex-col'>


        <Header />

        {
          result ? (<Result /> 
          ) :  loading ? (<Transcribe />
          ) : audioAvailable ? 
          (<File file={file} audio={setAudio} handleReset={handleReset} />) :    
          (<HomePage setFile={setFile} setAudio={setAudio}/>)
        }


       




      </section>
    </div>
  )
}
