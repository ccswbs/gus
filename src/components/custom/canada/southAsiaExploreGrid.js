import React from 'react';
import data from "../../../data/custom/canada/south_asia_explore_grid.yml"
import { Row, Col } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer'
import styled from "styled-components"

const Background = styled(PageContainer.FullWidth)`
  background: #F4F7FA;
`
const HeadingIcon = styled.i`
  color: ${props => (props.iconColour ?? "#000000")};
`

const SouthAsiaExploreGrid = () => {
    return (
      <Background>
        <PageContainer.SiteContent>
          <PageContainer.ContentArea>
            <h2 className="mt-4">{data.title}</h2>
            <Row className="row-cols-1 row-cols-md-3 g-4 mt-0">
                {data.content.map(({title, body_html, icon, icon_color}, index) => 
                    <Col key={`southasia-explore-grid-${index}`} className="pe-4">
                      <h3 className="h4 text-dark mt-0 d-flex align-items-start"><HeadingIcon aria-hidden={true} className={`${icon} pe-3`} iconColour={icon_color} /> {title}</h3>
                      <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                    </Col>
                )}
            </Row>
          </PageContainer.ContentArea>
        </PageContainer.SiteContent>
      </Background>
  )
};

export default SouthAsiaExploreGrid;