import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="text-center">
                <h3 className="display-4">Online PDF Splitter</h3>
                <p>Split individual or multiple pages of a PDF into separate files.</p>
            </div>
        );
    }
}

