import React from 'react';
import data from "../../../data/custom/lang/supportive_community.yml"
import { StaticImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"

const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`

const Aside = ({aside}) => (
    <div className="card bg-dark border-0 text-white p-5 rounded-0 align-self-center me-5">
        <div className="card-body px-5">
            <h3 className="mt-0 text-white h1">{aside.title}</h3>
            <div className="card-text fs-3" dangerouslySetInnerHTML={{__html: aside.body_html}}></div>
        </div>
    </div>
)

const Testimony = ({ testimonial }) => (
    <div className="mt-5 me-3 pb-5">
        <Row className="justify-content-center g-5">
            <Col xs={5} sm={4} md={3}>
                <StaticImage src="../../../images/lang/rachelquotephoto.jpg"  alt={testimonial.source.image.alt ?? ""} imgClassName="rounded-circle" />
            </Col>
            <Col sm={8} md={9} className="ps-5 fs-2">
                <QuoteText className="fs-1">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{testimonial.quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                <p className="author"><strong>{testimonial.source.name}</strong>
                <br /><em>{testimonial.source.desc}</em></p>
            </Col>
        </Row>
    </div>
)


const LangBcommSupportiveCommunity = () => {
   
  return(
    <div className="d-flex flex-column bg-light overflow-hidden">
        <div className="full-width-container">
            <Container className="page-container pe-0">
                <Row className="site-content mx-4 py-0 pe-0">
                    <Col md={6} className="pe-5 pt-4">
                        <h2>{data.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: data.body_html}}></div>
                        <Testimony testimonial={data.testimonial} />
                    </Col>
                    <Col md={6} className="d-flex position-relative p-0">
                        {data.aside.image.mid && 
                            <StaticImage 
                                src="../../../images/lang/1styeartoolkit-bg.jpg" 
                                alt={data.aside.image.alt ?? ""} 
                                className="position-absolute top-0 end-0"
                            />
                          }
                        <Aside aside={data.aside} />    
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  )
};

export default LangBcommSupportiveCommunity;