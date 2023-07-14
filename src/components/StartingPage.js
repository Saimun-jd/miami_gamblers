import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Card, Form, ListGroup } from "react-bootstrap";
import { MyContext } from "../context";

function StartingPage() {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, ""]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = textInput.current.value;
        const valid = validate(val);
        if (valid) {
            textInput.current.value = "";
            if (!context.state.players.includes(val)) {
                context.addPlayer(val);
                setError([false, ""]);
            } else {
                setError([true, "This player is already registered"]);
                setTimeout(() => {
                    setError([false, ""]);
                }, 3000);
            }
        } else {
            console.log(error);
        }
    };

    const validate = (val) => {
        if (val === "") {
            setError([true, "You have to enter a valid name"]);
            setTimeout(() => {
                setError([false, ""]);
            }, 3000);
            return false;
        }
        if (val.length < 3) {
            setError([true, "Your name must be atleast 3 char long"]);
            setTimeout(() => {
                setError([false, ""]);
            }, 3000);
            return false;
        }
        return true;
    };

    //console.log(context);

    return (
        <>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add a player name"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>
                {error[0] ? <Alert variant="danger">{error[1]}</Alert> : null}
                <Button type="submit" variant="primary" className="miami mt-2">
                    Add Player
                </Button>
                {context.state.players.length > 0 ? (
                    <Card className="mt-2" style={{ width: "18rem" }}>
                        <ListGroup variant="flush">
                            {context.state.players.map((item, idx) => (
                                <ListGroup.Item
                                    className="d-flex justify-content-between align-item-center"
                                    key={idx}
                                >
                                    {item}
                                    <span
                                        className="badge badge-danger"
                                        onClick={() =>
                                            context.removePlayer(idx)
                                        }
                                    >
                                        x
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <div
                            className="action_button"
                            onClick={() => context.next()}
                        >
                            NEXT
                        </div>
                    </Card>
                ) : null}
            </Form>
        </>
    );
}

export default StartingPage;
