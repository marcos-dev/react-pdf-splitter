import React, { Component } from 'react';
import './Footer.css'

export class Footer extends Component {
    static displayName = Footer.name;


    render() {
        let url = "rmcbrothers.com.br"
        return (
            <footer className="border-top footer text-muted">
                <div className="container">
                    &copy; 2021 - <a href={url}>RMC Brothers</a>
                </div>
            </footer>
        );
    }
}



