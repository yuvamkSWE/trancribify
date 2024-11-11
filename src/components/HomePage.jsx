import  {useEffect, useRef, useState} from 'react'
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import AnimatedShinyText from './ui/animated-shiny-text.jsx';

export default function HomePage(props) {


  const { setFile, setAudio } = props;



  HomePage.propTypes = {

      setFile: PropTypes.func,
      setAudio: PropTypes.func,

  }

  const [recordingStatus, setRecordingStatus] = useState('inactive'); 
  const [audioChunks, setAudioChunks] = useState([]);                 
  const [duration, setDuration] = useState(0);                        
  const mediaRecorder = useRef(null);                                 //TO STORE MEDIARECORDER INSTANCE 
  const mimeType = 'audio/webm';                                      //AUDIO FORMAT TYPE




  async function startRecording() {


    let tempStream;
    console.log('Start recording');


    try {

      tempStream = await navigator.mediaDevices.getUserMedia({          // MICROPHONE PERMISSION REQUEST
        audio: true,                                                    // AUDIO STREAM SETUP
        video: false
      });

    } catch (err) {

      console.log(err.message);                   
      return;

    }

    setRecordingStatus('recording');  

    // Creates new MediaRecorder instance with audio stream
    mediaRecorder.current = new MediaRecorder(tempStream, {type: mimeType});
    mediaRecorder.current.start();                                       // START AUDIO RECORDING


    let localAudioChunks = [];

    // Pushes audio data chunks into array as they're available
    mediaRecorder.current.ondataavailable = (event) => {

      if (typeof event.data === 'undefined' || event.data.size === 0) return;
      localAudioChunks.push(event.data);

    };


    setAudioChunks(localAudioChunks); 


  }



  // Function to stop recording and create an audio blob
  async function stopRecording() {


    setRecordingStatus('inactive');
    console.log('Stop recording');

    mediaRecorder.current.stop();                                          // STOP MEDIARECORDER INSTANCE

    // After stopping, creates a Blob from `audioChunks` and passes it to `setAudio`
    mediaRecorder.current.onstop = () => {

      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudio(audioBlob); 

      //RESET 
      setAudioChunks([]);  
      setDuration(0);    
          
    };

  }

  // EFFECT HOOK FOR DURATION

  useEffect(() => {

    if (recordingStatus === 'inactive') return;                            // EXIT

    const interval = setInterval(() => {                                   // ++duration per s
      setDuration(curr => curr + 1); 
    }, 1000);

    return () => clearInterval(interval);                                  // CLEANUP/CLEARING INTERVAL

  }, [recordingStatus] // Dependency array ensures the interval only runs during recording

  ); 

  
  return (
    <main className='text-white flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4  justify-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Transcribify</h1>
            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <AnimatedShinyText ></AnimatedShinyText>

                <AnimatedShinyText
                    className=" inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-red-600 hover:duration-300 hover:dark:text-red-400">
                    <span className={'text-xl'}>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</span>
                </AnimatedShinyText>

                <div className='flex items-center gap-2'>

                </div>
                <div className={'text-black flex items-center gap-2' }>
                    <p className={(recordingStatus === 'recording' ? ' text-rose-500' : "")} >{duration}s</p>
                    <FontAwesomeIcon  className={(recordingStatus === 'recording' ? ' text-rose-500' : "")}  icon={faMicrophone} />
                </div>
            </button>
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
                const tempFile = e.target.files[0]
                setFile(tempFile)
            }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
        </main>
  );
}
