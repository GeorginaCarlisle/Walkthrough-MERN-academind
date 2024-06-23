import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      // When setIsValid is called it does not immediately update, instead just scheduling the update
      fileIsValid = true;
      // While waiting for the update we manually checked and control the valid state
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid)
    // If isValid was used above the new value wouldn't be passed into the props as isValid won't be updated until after the function has run.
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input 
        id={props.id}
        ref={filePickerRef}
        style={{display: 'none'}}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler} />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image.</p>}
          </div>
          <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  )
};

export default ImageUpload