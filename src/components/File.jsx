
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import GradualSpacing from './ui/gradual-spacing';

export default function File(props) {

    // eslint-disable-next-line no-unused-vars
    const { file, setAudio, handleReset } = props;

    File.propTypes = {
        file: PropTypes.object,
        setAudio: PropTypes.func,
        handleReset : PropTypes.func
    }




  return (
    <main className='flex-1 p-4 flex flex-col gap-3 justify-center items-center w-fit max-w-full mx-auto' >

        <h1 className="text-white text-4xl font-medium sm:text-6xl " >
            <GradualSpacing text={'Your File'} />
        </h1>

        <div className=' flex flex-col text-left my-4 text-white items-center mx-auto'>
                <h3 className='font-bold'>Name</h3>
                <p className='truncate text-black'>{file ? file.name : 'Custom audio'}</p>
        </div>

        <div className='flex items-center justify-between gap-4'>
                <button onClick={handleReset} className='specialBtn  px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium '>
                    Reset
                </button>
                <button className='specialBtn  px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium '>
                    <p>Transcribify</p>
                    <FontAwesomeIcon icon={faPenFancy} />
                </button>
            </div>

    </main>
  )
}
