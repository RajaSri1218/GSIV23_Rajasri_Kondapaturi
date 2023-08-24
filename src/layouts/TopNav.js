import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import './TopNav.css';
import { useNavigate } from 'react-router-dom';


const TopNav = ({ isListPage, handleMovieSearch }) => {

    const [movieName, setMovieName] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {       
        if (movieName) {
            handleMovieSearch(movieName);
        }
    };

    const handleSearchInput = (event) => {
        const inputValue = event.target.value;
        setMovieName(inputValue);
        if (inputValue === "") {
            handleMovieSearch("");
        } else {
            handleMovieSearch(inputValue);
        }
    };

    const handleHome = () => {
       navigate('/home')
    }


    return (
        <Card as={Card.Body} className="card-no-border-radius shadow-sm" bg="light">
            <Row className='align-items-center'>
                {isListPage ?
                    <Col md={4}>
                        <Form.Group>
                            <div className='position-relative'>
                                <Form.Control type="text" placeholder="Search" className="form-input w-100" name='movie' value={movieName} onChange={handleSearchInput} />
                                <span onClick={handleSearch} className="position-absolute end-0 top-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="16px" height="16px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg></span>
                            </div>
                        </Form.Group>
                    </Col>
                    :
                    <Col md={4}>
                        <Form.Group>
                            <div className='content'>
                                <h6>Movie Details</h6>
                            </div>
                        </Form.Group>
                    </Col>
                }

                <Col md={'auto'} className="ms-auto">
                    <Button onClick={handleHome} variant='primary'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill='#fff'>    <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" /></svg></Button>
                </Col>
            </Row>
        </Card>
    );
}

export default TopNav;
