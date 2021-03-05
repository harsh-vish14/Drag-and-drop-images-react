import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { FcApproval } from 'react-icons/all'
import makeid from './helper/function'
import storage from './firbase'

function MyDropzone() {
    const [imagegiven, setimagegiven] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [textCopied, setTextCopied] = useState('Copy')
    const [progress, setProgress] = useState(0);

    const UploadImageToFirestore = async (images) => {
        var metadata = {
            contentType: 'image/jpeg',
        };
        var imageName = makeid(10)
        console.log(images)
        await storage.ref(`images/${imageName}${images.name}`).put(images.url, metadata)
            .on('state_changed',
                (snapshot) => {
                    setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                }, (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref('images').child(`${imageName}${images.name}`).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageUrl(fireBaseUrl);
                        })
                })
    }
    const onDrop = useCallback(acceptedFiles => {
        var name = acceptedFiles[0].name
        var imagesURls = acceptedFiles[0]
        var data = {
            name: name,
            url: imagesURls
        }
        UploadImageToFirestore(data)
        console.log(acceptedFiles[0])
        setimagegiven(true);

    }, [])
    const copied = () => {
        navigator.clipboard.writeText(imageUrl);
        
        setTextCopied('Copied!')
    }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className='main-div'>
            {imagegiven ? (
                progress == 100 ? (
                    <>
                        <div>
                            <div className='sign' style={{ textAlign: 'center' }}>
                                <div>
                                    <FcApproval style={{ fontSize: '30px' }} />
                                </div>
                                <div>
                                    Uploaded Successfully!
                            </div>
                            </div>
                            <div className='image' style={{textAlign:'center'}}>
                                <img src={imageUrl} height='190px' style={{margin:'10px',borderRadius:'10px'}}/>
                            </div>
                            <div className='copy-link' style={{ display: 'flex', justifyContent: 'space-between', border: '2px solid black', borderRadius: '5px', padding: '5px', alignItems: 'center' }}>
                                <div style={{ fontSize: '15px', marginRight: '5px', overflow: 'hidden', height: '20px' }}>
                                    {imageUrl}
                                </div>
                                <div className='copybth' onClick={copied}>{textCopied}</div>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <div>
                                Uploading
                            </div>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: progress+'%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </>
                    )
            ) : (<>
                <div style={{ textAlign: 'center', fontSize: '23px' }}>Upload your image</div>
                <div style={{ fontSize: '15px', textAlign: 'center', marginBottom: '15px', marginTop: '10px' }}>File should be png,jpg...</div>
                <div className='input-part'>
                
                    <div {...getRootProps()} className='input-part' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <img src={process.env.PUBLIC_URL + '/images/image.svg'} style={{ height: '50%', marginBottom: '10px' }} />
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drop Image here,<br /> or <br /> click to select files</p>
                        }
                    </div>
                </div>
            </>
                )}
            <div style={{opacity:'60%'}}>
                Copyrights 2021 by Harshkumar Vishwakarma
            </div>
        </div>
    )
}

export default MyDropzone