import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = React.createContext();

class AppContext extends Component {
    state = {
        stage: 1,
        players: [],
        result: "",
    };

    addPlayerHandler = (player) => {
        this.setState((prevState) => ({
            players: [...prevState.players, player],
        }));
        toast.success("Player added successfully !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };

    removePlayerHandler = (idx) => {
        this.setState((current) => ({
            players: current.players.filter(
                (player) => current.players[idx] !== player
            ),
        }));
        toast.success("Player removed successfully !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };

    nextHandler = () => {
        const { players } = this.state;
        if (players.length < 2) {
            toast.error("Atleast 2 players are needed !!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } else {
            this.setState({ stage: 2 }, () => {
                setTimeout(() => {
                    this.generateLooserHandler();
                }, 3000);
            });
        }
    };

    resetGameHandler = () => {
        this.setState({
            stage: 1,
            players: [],
            result: "",
        });
    };

    generateLooserHandler = () => {
        const { players } = this.state;
        const winner = players[Math.floor(Math.random() * players.length)];
        this.setState({ result: winner });
    };

    clearResultHandler = (text) => {
        this.setState({ result: text });
    };

    render() {
        return (
            <>
                <MyContext.Provider
                    value={{
                        state: this.state,
                        addPlayer: this.addPlayerHandler,
                        removePlayer: this.removePlayerHandler,
                        next: this.nextHandler,
                        generateLooser: this.generateLooserHandler,
                        resetGame: this.resetGameHandler,
                        clearResult: this.clearResultHandler,
                    }}
                >
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer />
            </>
        );
    }
}

export { AppContext, MyContext };
