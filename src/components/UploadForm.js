import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

const UploadForm = (props) => {


    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [folder, setFolder] = useState(null)

    const types = ['image/png', 'image/jpeg', 'image/JPG']

    const changeHandler = (e) => {
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setFolder(props.folder)
            setError(null)
        } else {
            setFile(null)
            setFolder(null)
            setError('Please select an image file (png o jpeg)')
        }
    }


    return (
        <form>
            <input type='file' onChange={changeHandler}></input>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div className='file'>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} folder={folder} />}
            </div>
        </form>
    )
}

export default UploadForm