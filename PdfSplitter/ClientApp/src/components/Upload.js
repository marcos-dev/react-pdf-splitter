import React, { Component } from "react";
import DropZone from 'react-dropzone';
import { DropContainer, UploadMessage } from '../styles';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './Upload.css';

export default class Upload extends Component {

    renderDragMessage = (isDragActive, isDragReject) => {

        if (!isDragActive) {
            return <UploadMessage className="message">
                <FaCloudUploadAlt size={52}></FaCloudUploadAlt>
                <span className="sp-text">Choose file or drag it here.</span>
                </UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error" className="message">
                <FaCloudUploadAlt size={52}></FaCloudUploadAlt> 
                <span className="sp-text">Unsupported file.</span>
                </UploadMessage>
        }

        return <UploadMessage type="success" className="message">
            <FaCloudUploadAlt size={52}></FaCloudUploadAlt>
            <span className="sp-text">Drop the files here.</span>
            </UploadMessage>
    };

    render() {

        const { onUpload } = this.props;

        return (
            <DropZone accept="application/pdf" onDropAccepted={onUpload}>
                { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer className="zone"
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />

                        { this.renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </DropZone>
        );
    }
}