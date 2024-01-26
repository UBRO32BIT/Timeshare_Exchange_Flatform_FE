import React, {useState, useEffect} from 'react'
import CommonSection from '../components/Shared/CommonSection'

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/timeshare.css';
import SearchBar from '../components/Shared/SearchBar';
import tourData from '../assets/data/tours';
import {Container, Row, Col} from 'reactstrap';
import TourCard from '../components/Shared/TourCard';
import {
    GetAllTimeshare
} from "../services/timeshare.service";

const TimeShare = () => {

    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)
    const [tourList, setTourList] = useState([]);

    useEffect(() => {

        const pages = Math.ceil(5 / 4) //Later we use backend data
        setPageCount(pages);

    }, [page])
    useEffect(() => {
        async function Get(){
            const list = await GetAllTimeshare();
            setTourList(list);
        }
        Get()
    });
    return (
        <>
            <Header/>
            <CommonSection title={"All TimeShares"}></CommonSection>
            <section>
                <Container>
                    <Row>
                        <SearchBar/>
                    </Row>
                </Container>
            </section>
            <section className='pt-0'>
                <Container>
                    <Row>
                        {
                            tourList?.map(tour => (
                                <Col lg='3' className='mb-4' key={tour.id}>
                                    <TourCard tour={tour}/>
                                </Col>))
                        }
                        {/*{*/}
                        {/*    tourData?.map(tour => (*/}
                        {/*        <Col lg='3' className='mb-4' key={tour.id}>*/}
                        {/*            <TourCard tour={tour}/>*/}
                        {/*        </Col>))*/}
                        {/*}*/}
                        <Col lg='12'>
                            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                                {[...Array(pageCount).keys()].map(number => (
                                    <span key={number} onClick={() => setPage(number)}
                                          className={page === number ? "active__page" : ""}
                                    >
                                {number + 1}
                            </span>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer/>
        </>
    )
}

export default TimeShare