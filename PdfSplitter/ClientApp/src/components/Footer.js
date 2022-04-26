import React, { Component } from 'react';
import './Footer.css'

export class Footer extends Component {
    static displayName = Footer.name;


    render() {
        let url = "https://marcos-dev.github.io/"
        return (
            <footer className="border-top footer text-muted">
                <div className="container">
                    &copy; 2021 - <a href={url}>MPMP</a>
                </div>
            </footer>
        );
    }
}



