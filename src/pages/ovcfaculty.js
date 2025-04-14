import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';


const IndexPage = ({ data }) => {
    const allNodePages = data.allNodePage.edges;
    const ovcBioFaculty = [];
    const ovcClinFaculty = [];
    const ovcPathFaculty =[];
    const ovcPopFaculty =[];

    // Fetch OVC Faculty per department //
    for (let i=0; i<allNodePages.length; i++) {
      for (let j=0; j<allNodePages[i].node?.relationships?.field_tags.length; j++){
        if ((allNodePages[i].node?.relationships?.field_tags.length > 0 ) && (allNodePages[i].node.relationships.field_tags[j].name === "OVC Department of Biomedical Sciences")){
          ovcBioFaculty.push(allNodePages[i]);            
        }
      }
    } 
    for (let i=0; i<allNodePages.length; i++) {
      for (let j=0; j<allNodePages[i].node?.relationships?.field_tags.length; j++){
        if ((allNodePages[i].node?.relationships?.field_tags.length > 0 ) && (allNodePages[i].node.relationships.field_tags[j].name === "OVC Department of Clinical Studies")){
          ovcClinFaculty.push(allNodePages[i]);            
        }
      }
    } 
    for (let i=0; i<allNodePages.length; i++) {
      for (let j=0; j<allNodePages[i].node?.relationships?.field_tags.length; j++){
        if ((allNodePages[i].node?.relationships?.field_tags.length > 0 ) && (allNodePages[i].node.relationships.field_tags[j].name === "OVC Department of Pathobiology")){
          ovcPathFaculty.push(allNodePages[i]);            
        }
      }
    } 
    for (let i=0; i<allNodePages.length; i++) {
      for (let j=0; j<allNodePages[i].node?.relationships?.field_tags.length; j++){
        if ((allNodePages[i].node?.relationships?.field_tags.length > 0 ) && (allNodePages[i].node.relationships.field_tags[j].name ===  "OVC Department of Population Medicine")){
          ovcPopFaculty.push(allNodePages[i]);            
        }
      }
    } 

    ovcBioFaculty.sort((a,b) => (a.node.title.split(' ').pop() > b.node.title.split(' ').pop()) ? 1 : ((b.node.title.split(' ').pop() > a.node.title.split(' ').pop()) ? -1 : 0));
    ovcClinFaculty.sort((a,b) => (a.node.title.split(' ').pop() > b.node.title.split(' ').pop()) ? 1 : ((b.node.title.split(' ').pop() > a.node.title.split(' ').pop()) ? -1 : 0));
    ovcPathFaculty.sort((a,b) => (a.node.title.split(' ').pop() > b.node.title.split(' ').pop()) ? 1 : ((b.node.title.split(' ').pop() > a.node.title.split(' ').pop()) ? -1 : 0));
    ovcPopFaculty.sort((a,b) => (a.node.title.split(' ').pop() > b.node.title.split(' ').pop()) ? 1 : ((b.node.title.split(' ').pop() > a.node.title.split(' ').pop()) ? -1 : 0));
   
    // Fetch Adjunct, Emeritus, Departmental Faculty  for each department //

    const ovcBioEmeritus = [];
    const ovcBioAdjunct = [];
    const ovcBioDepartment = [];

    const ovcClinEmeritus = [];
    const ovcClinAdjunct = [];
    const ovcClinDepartment = [];
    
    const ovcPathEmeritus = [];
    const ovcPathAdjunct = [];
    const ovcPathDepartment = [];
    
    const ovcPopEmeritus = [];
    const ovcPopAdjunct = [];
    const ovcPopDepartment = [];

    for (let i=0; i<ovcBioFaculty.length; i++) {
      for (let j=0; j<ovcBioFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcBioFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcBioFaculty[i].node.relationships.field_tags[j].name === "OVC Professor Emeritus")){
          ovcBioEmeritus.push(ovcBioFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcBioFaculty.length; i++) {
      for (let j=0; j<ovcBioFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcBioFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcBioFaculty[i].node.relationships.field_tags[j].name === "OVC Adjunct Faculty")){
          ovcBioAdjunct.push(ovcBioFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcBioFaculty.length; i++) {
      for (let j=0; j<ovcBioFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcBioFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcBioFaculty[i].node.relationships.field_tags[j].name === "OVC Department Faculty")){
          ovcBioDepartment.push(ovcBioFaculty[i]);            
        }
      }
    } 
    
    for (let i=0; i<ovcClinFaculty.length; i++) {
      for (let j=0; j<ovcClinFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcClinFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcClinFaculty[i].node.relationships.field_tags[j].name === "OVC Professor Emeritus")){
          ovcClinEmeritus.push(ovcClinFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcClinFaculty.length; i++) {
      for (let j=0; j<ovcClinFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcClinFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcClinFaculty[i].node.relationships.field_tags[j].name === "OVC Adjunct Faculty")){
          ovcClinAdjunct.push(ovcClinFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcClinFaculty.length; i++) {
      for (let j=0; j<ovcClinFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcClinFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcClinFaculty[i].node.relationships.field_tags[j].name === "OVC Department Faculty")){
          ovcClinDepartment.push(ovcClinFaculty[i]);            
        }
      }
    } 

    for (let i=0; i<ovcPathFaculty.length; i++) {
      for (let j=0; j<ovcPathFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPathFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPathFaculty[i].node.relationships.field_tags[j].name === "OVC Professor Emeritus")){
          ovcPathEmeritus.push(ovcPathFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcPathFaculty.length; i++) {
      for (let j=0; j<ovcPathFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPathFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPathFaculty[i].node.relationships.field_tags[j].name === "OVC Adjunct Faculty")){
          ovcPathAdjunct.push(ovcPathFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcPathFaculty.length; i++) {
      for (let j=0; j<ovcPathFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPathFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPathFaculty[i].node.relationships.field_tags[j].name === "OVC Department Faculty")){
          ovcPathDepartment.push(ovcPathFaculty[i]);            
        }
      }
    } 

    for (let i=0; i<ovcPopFaculty.length; i++) {
      for (let j=0; j<ovcPopFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPopFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPopFaculty[i].node.relationships.field_tags[j].name === "OVC Professor Emeritus")){
          ovcPopEmeritus.push(ovcPopFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcPopFaculty.length; i++) {
      for (let j=0; j<ovcPopFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPopFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPopFaculty[i].node.relationships.field_tags[j].name === "OVC Adjunct Faculty")){
          ovcPopAdjunct.push(ovcPopFaculty[i]);            
        }
      }
    } 
    for (let i=0; i<ovcPopFaculty.length; i++) {
      for (let j=0; j<ovcPopFaculty[i].node?.relationships?.field_tags.length; j++){
        if ((ovcPopFaculty[i].node?.relationships?.field_tags.length > 0 ) && (ovcPopFaculty[i].node.relationships.field_tags[j].name === "OVC Department Faculty")){
          ovcPopDepartment.push(ovcPopFaculty[i]);            
        }
      }
    } 
  
    return (
    <Layout>
        <Seo title="Ontario Veterinary College" />
        <div className="container page-container">
          <div className="site-content">
            <div className="content-area">
              <h1>Ontario Veterinary College Faculty List</h1>        
              <h2 className='text-dark' id="biomedical-sciences">Department of Biomedical Sciences</h2> 
              <h3 className='text-dark'>Departmental Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcBioDepartment.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Professor Emeritus/Emerita</h3>
                <ul className="three-col-md">
                  {
                    ovcBioEmeritus.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Adjunct Faculty Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcBioAdjunct.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                
                
              <h2 className='text-dark' id="clinical-studies">Department of Clinical Studies</h2> 
              <h3 className='text-dark'>Departmental Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcClinDepartment.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Professor Emeritus/Emerita</h3>
                <ul className="three-col-md">
                  {
                    ovcClinEmeritus.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Adjunct Faculty Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcClinAdjunct.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
              <h2 className='text-dark' id="pathobiology">Department of Pathobiology</h2> 
              <h3 className='text-dark'>Departmental Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcPathDepartment.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Professor Emeritus/Emerita</h3>
                <ul className="three-col-md">
                  {
                    ovcPathEmeritus.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Adjunct Faculty Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcPathAdjunct.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
              <h2 className='text-dark' id="population-medicine">Department of Population Medicine</h2>  
              <h3 className='text-dark'>Departmental Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcPopDepartment.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Professor Emeritus/Emerita</h3>
                <ul className="three-col-md">
                  {
                    ovcPopEmeritus.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
                <h3 className='text-dark'>Adjunct Faculty Faculty</h3>
                <ul className="three-col-md">
                  {
                    ovcPopAdjunct.map((faculty) => {
                      return (
                        <li key={faculty.node.drupal_id}><Link to = {faculty.node.path.alias}>{faculty.node.title} </Link></li>
                      )
                    })
                  }
                </ul>
            </div>
          </div>
        </div>
    </Layout>
    )
}

export default IndexPage

export const query = graphql`{
  allNodePage(sort: {title: ASC}) {
    edges {
      node {
        title
        drupal_id
        path {
          alias
        }
        relationships {
          field_tags {
            __typename
            ... on TaxonomyInterface {
              drupal_id
              id
              name
            }
          }
        }
        status
      }
    }
  }
}`
