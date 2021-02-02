import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdError, MdCloudDownload } from 'react-icons/md';
import { FaRegFileArchive, FaCheckCircle } from 'react-icons/fa';

import { Container, FileInfo, Preview } from '../styles';

const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map(uploadedFile => (
            <li key={uploadedFile.id}>
                <FileInfo>
                    <Preview><FaRegFileArchive size={38}></FaRegFileArchive></Preview>
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>{uploadedFile.readableSize}
                            {!!uploadedFile.url && (
                                <button onClick={() => onDelete(uploadedFile.id)} size={24}>Delete</button>
                            )}
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: '#222' }
                            }}
                            strokeWidth={10}
                            value={uploadedFile.progress}
                        />
                    )}

                    {uploadedFile.url && (
                        <a href={uploadedFile.url}
                            target='_blank'
                            rel="noopener noreferrer">
                            <MdCloudDownload style={{ marginRight: 8 }} size={28} color="#222" ></MdCloudDownload>
                        </a>
                    )}

                    {uploadedFile.uploaded && <FaCheckCircle size={28} color="#78e5d5"></FaCheckCircle>}
                    {uploadedFile.MdError && <MdError size={28} color="#E57878"></MdError>}


                </div>
            </li>
        ))}
    </Container>
);

export default FileList;