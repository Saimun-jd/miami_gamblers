import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";

import PlayGround from "./components/PlayGround";
import StartingPage from "./components/StartingPage";
import { MyContext } from "./context";

export class App extends Component {
    static contextType = MyContext;

    render() {
        return (
            <div className="wrapper">
                <div className="center-wrapper">
                    <h1>Who pays the bill?</h1>
                    {this.context.state.stage === 1 ? (
                        <StartingPage />
                    ) : (
                        <PlayGround />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
