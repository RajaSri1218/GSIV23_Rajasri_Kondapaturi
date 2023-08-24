import React from 'react'
import { Col, Container, Row, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className='PageNotFound vh-100 d-flex align-items-center justify-content-center'>
      <Container>
        <Row>
          <Col xs={12} className='text-center'>
            <Image src="https://cdn-icons-png.flaticon.com/512/9841/9841569.png" fluid width="350" alt="PageNotFound" />
            <div className="content my-3">
              <h5>Page Not Found</h5>
              <p>We could not find what you were looking for.</p>
              <p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
            </div>
            <Button variant='link shadow-none' onClick={() => navigate(-1)}>Go to Back!</Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PageNotFound