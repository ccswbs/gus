import React from 'react';
import data from "../../../data/custom/lang/student_blog.yml"
import { Row, Col } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer'
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Background = styled(PageContainer.FullWidth)`
  background: ${props => (props.background ?? "#FFFFFF")};
`

const LangBcommStudentBlog = ({background}) => {
    return(
       <Background background={background}>
         <PageContainer.SiteContent>
           <PageContainer.ContentArea>
             <Row className="my-sm-5">
               <Col md={7}>
                 <StaticImage src="../../../images/unibuddy.webp" alt={data.image.alt ?? ""} />
               </Col>
               <Col md={5} className="mt-5 ps-5">
                 <h3>{data.title}</h3>
                 <p><em>{data.subtitle}</em></p>
                 <p>{data.body}</p>
                 <p><a href={data.link.url}>{data.link.title} <span className="visually-hidden">{data.link.context}</span></a></p>
               </Col>
             </Row>
           </PageContainer.ContentArea>
         </PageContainer.SiteContent>
       </Background>
    )
};

export default LangBcommStudentBlog;