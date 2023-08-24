import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Container } from "react-bootstrap";
import { ApiCall } from "src/lib/apis/ApiCall";
import DetailsPage from "src/features/detailsPage.js";
import { useNavigate } from "react-router-dom";
import TopNav from "src/layouts/TopNav";
import { roundToOneDeci } from "src/utils/util"

const ListPage = () => {

  const navigate = useNavigate();
  const [movieListData, setMovieListData] = useState([]);
  const [movieID, setMovieID] = useState(null);
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const getMovieListData = (page) => {
    ApiCall("get", `/genre/movie/list?page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          setMovieListData((prevData) => [...prevData, ...response.data.genres]);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    if (currentPage === 1 && !isLoading) {
      getMovieListData(currentPage);
      setIsLoading(true)
    }
  }, [currentPage]);

  const handleMovieDetails = (id) => {
    setMovieID(id);
    navigate(`/details-page/${id}`);
  };

  const handleMovieSearch = (movieName) => {
    if (movieName.trim() === "") {
      setIsSearching(false);
      setSearchMovieList([]);
    } else {
      setIsSearching(true);
      ApiCall("get", `/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`)
        .then((response) => {
          if (response.status === 200) {
            setSearchMovieList(response.data.results);

          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
      setIsLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentPage > 1 && isLoading) {
      getMovieListData(currentPage);
    }
  }, [currentPage, isLoading]);


  return (
    <div className="section">
      <Container fluid>
        <Row>
          <TopNav
            isListPage={true}
            searchMovieList={searchMovieList}
            handleMovieSearch={handleMovieSearch}
          />
          {
            isSearching ?
              (
                searchMovieList.map((item, index) => (
                  <Col xxl={2} xl={3} lg={4} md={6} className="mb-3" key={index}>
                    <Card
                      as={Card.Body}
                      onClick={() => {
                        handleMovieDetails(item.id);
                      }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                        fluid
                      />
                      <div className="content">
                        <h6>
                          {item?.title} <span>({roundToOneDeci(item?.vote_average)})</span>
                        </h6>
                        <p>{item?.overview}</p>
                      </div>
                    </Card>
                  </Col>
                )))
              :
              (
                movieListData.length !== 0 &&
                movieListData.map((item, index) => (
                  <Col xxl={2} xl={3} lg={4} md={6} className="mb-3" key={index}>
                    <Card
                      as={Card.Body}
                      onClick={() => {
                        handleMovieDetails(item.id);
                      }}
                    >
                      <Image
                        src="https://p.kindpng.com/picc/s/642-6425597_word-art-movies-word-hd-png-download.png"
                        fluid
                      />
                      <div className="content">
                        <h6>
                          {item.name} <span>(Rating)</span>
                        </h6>
                        <p>Description... (2 Lines)</p>
                      </div>
                    </Card>
                  </Col>
                )))
          }
          {movieID !== null && <DetailsPage />}
        </Row>
      </Container>
    </div>
  );
};

export default ListPage;
