import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { FcApproval } from 'react-icons/all'

function MyDropzone() {
    const [imagegiven, setimagegiven] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [textCopied,setTextCopied] = useState('Copy')
    const onDrop = useCallback(acceptedFiles => {
        setImageUrl(URL.createObjectURL(acceptedFiles[0]))
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
                <>
                    <div>
                        <div className='sign' style={{textAlign:'center'}}>
                            <div>
                                <FcApproval style={{fontSize:'30px'}}/>
                            </div>
                            <div>
                                Uploaded Successfully!
                            </div>
                        </div>
                        <div className='image' style={{background:`url(${imageUrl})`,height:'200px',backgroundSize:'contain',backgroundPosition:'center center',backgroundRepeat:'no-repeat'}}></div>
                        <div className='copy-link' style={{display:'flex',justifyContent:'space-between',border:'2px solid black',borderRadius:'5px',padding:'5px',alignItems:'center'}}>
                            <div style={{fontSize:'15px',marginRight:'5px',overflow:'hidden',height:'20px'}}>
                                {imageUrl}
                            </div>
                            <div className='copybth' onClick={copied}>{textCopied}</div>
                        </div>
                    </div>
                </>
            ) : (
                    
                    <>
                        <div style={{ textAlign: 'center', fontSize: '23px' }}>Upload your image</div>
                        <div style={{ fontSize: '15px', textAlign: 'center', marginBottom: '15px', marginTop: '10px' }}>File should be png,jpg...</div>
                        <div className='input-part'>
                
                            <div {...getRootProps()} className='input-part' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <img src='image.svg' style={{ height: '50%', marginBottom: '10px' }} />
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
        </div>
    )
}

export default MyDropzone