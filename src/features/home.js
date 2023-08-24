import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className="details pt-3 pb-3">
            <Container fluid>
                <Row className="gy-3 align-items-center">
                    <div className="text-danger" onClick={handleClick}>
                        Back to List Page
                    </div>
                    <Col md="3">
                        <Image
                            className="rounded-4 shadow-sm"
                            src={`https://img.freepik.com/premium-photo/home-word-concept-text-banner-isolated-white-background_323015-652.jpg?w=2000`}
                            fluid
                        />
                    </Col>
                    <Col md="auto">
                        <div className="content">
                            <h4 className="text-primary">
                                Home Page
                            </h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;