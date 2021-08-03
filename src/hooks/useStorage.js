import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, timestamp } from '../firebase/config'

const useStorage = (file, folder, caption) => {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        //references
        const storageRef = projectStorage.ref(folder + file.name)
        const collectionRef = projectFirestore.collection(folder)


        storageRef.put(file).on('state_changed', (snap) => {

            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100

            setProgress(percentage)

        }, (err) => {
            setError(err)
        }, async () => {

            const url = await storageRef.getDownloadURL()
            const createdAt = timestamp()
            const fileName = file.name
            collectionRef.add({ url, createdAt, fileName, caption})
            setUrl(url)
        })
    }, [file, folder, caption])
 
    return { progress, url, error }
}

export default useStorage