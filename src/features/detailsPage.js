import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { ApiCall } from "src/lib/apis/ApiCall";
import { useParams } from "react-router-dom";
import TopNav from "src/layouts/TopNav";
import { getYear, convertTimeFormat, roundToOneDeci } from "src/utils/util"

const DetailsPage = () => {

  const { movieID } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    if (movieID !== undefined) {
      getMovieDetails(movieID);
    }
  }, []);

  const getMovieDetails = (movieID) => {
    ApiCall("get", `/movie/${movieID}`)
      .then((response) => {
        if (response?.status === 200) {
          setMovieDetail(response.data);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };


  return (
    <div className="details pt-3 pb-3">
      <Container fluid>
        <Row className="gy-3 align-items-center">
          <TopNav isListPage={false} />
          <Col md="3">
            <Image
              className="rounded-4 shadow-sm"
              src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
              fluid
            />
          </Col>
          <Col md="auto">
            <div className="content">
              <h4 className="text-primary">
                {movieDetail?.original_title}
                <span>({roundToOneDeci(movieDetail?.vote_average)})</span>
              </h4>
              <div className="text-primary">{movieDetail?.tagline}</div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="text-danger">
                  {getYear(movieDetail?.release_date)}
                </div>
                <div>|</div>
                <div className="text-success">
                  {convertTimeFormat(movieDetail?.runtime)}
                </div>
                <div>|</div>
                <div className="text-primary">Director</div>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="fw-bold">Cast: </div>
                <div className="text-truncate">Actor 1 , Actor 2, ...</div>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="fw-bold">Description: </div>
                <div className="text-content">{movieDetail?.overview}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailsPage;
