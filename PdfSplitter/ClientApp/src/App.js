import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import GlobalStyle from './styles/global'
import Upload from './components/Upload';
import FileList from './components/FileList'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  state = {
    uploadedFiles: [],
  }

  // async componentDidMount(){
  //   const response = await api.get('file');

  //   this.setState({
  //     uploadedFiles: response.data.map(file => ({
  //       id: file.id,
  //       name: file.name,
  //       readableSize: filesize(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url
  //     }))
  //   })
  // }

  // componentWillUnmount(){
  //   this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  // }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(file => {
        return id === file.id ? { ...file, ...data } : file;
      })
    })
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.id + "#" + uploadedFile.name);

    api.post('file', data, {
      onUploadProgress: e => {
        const progress = parseInt((Math.round(e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress,
        })
      }
    }).then(response => {
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id,
        url: response.data.url
      })
    }).catch(response => {
      this.updateFile(uploadedFile.id, {
        error: true,
        id: response.data.id,
        url: response.data.url
      })
    });

  }

  handleDelete = async id => {
    await api.delete(`file/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    })
  }

  render() {

    const { uploadedFiles } = this.state;

    return (
      <Layout>
        <GlobalStyle></GlobalStyle>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Upload onUpload={this.handleUpload}></Upload>
        { !!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={this.handleDelete}></FileList>
        )}

      </Layout>
    );
  }
}
