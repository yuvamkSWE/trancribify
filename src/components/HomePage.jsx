import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faFileAudio } from '@fortawesome/free-solid-svg-icons'

export default function HomePage(props) {
  // Destructuring props to access `setAudio` and `setFile` functions
  const { setAudio, setFile } = props;

  // State variables for recording
  const [recordingStatus, setRecordingStatus] = useState('inactive'); // Tracks if recording is active/inactive
  const [audioChunks, setAudioChunks] = useState([]); // Holds audio chunks from recording
  const [duration, setDuration] = useState(0); // Tracks recording duration in seconds

  // Ref to store the media recorder instance
  const mediaRecorder = useRef(null);

  const mimeType = 'audio/webm'; // MIME type for audio format

  // Function to start recording audio
  async function startRecording() {
    let tempStream;
    console.log('Start recording');

    try {
      // Requests permission for microphone and sets up audio stream
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message); // Logs error if microphone access fails
      return;
    }

    setRecordingStatus('recording'); // Changes status to 'recording'

    // Creates new MediaRecorder instance with audio stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start(); // Starts recording audio
    let localAudioChunks = [];

    // Pushes audio data chunks into array as they're available
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined' || event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks); // Updates `audioChunks` state with recorded data
  }

  // Function to stop recording and create an audio blob
  async function stopRecording() {
    setRecordingStatus('inactive'); // Stops the recording status
    console.log('Stop recording');

    mediaRecorder.current.stop(); // Stops MediaRecorder instance

    // After stopping, creates a Blob from `audioChunks` and passes it to `setAudio`
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudio(audioBlob);  // Updates parent component with the audio blob
      setAudioChunks([]);   // Resets `audioChunks` to empty
      setDuration(0);       // Resets the recording duration
    };
  }

  // Effect hook to track and increment the recording duration
  useEffect(() => {
    if (recordingStatus === 'inactive') return; // If recording is inactive, exit

    const interval = setInterval(() => {
      setDuration(curr => curr + 1); // Increment duration every second
    }, 1000);

    // Cleans up interval on component unmount or when recording stops
    return () => clearInterval(interval);
  }, [recordingStatus]); // Dependency array ensures the interval only runs during recording

  return (
    <main className='text-white flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4  justify-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Transcribify</h1>
            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                    {/* {duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )} */}
                    <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
            </button>
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
                const tempFile = e.target.files[0]
                setFile(tempFile)
            }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
        </main>
  );
}
