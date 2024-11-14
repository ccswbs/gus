import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from 'components/layout';
import Seo from 'components/seo';
import { Helmet } from 'react-helmet';

const GradProgram = () => (
    <Layout>
        <Seo title="Graduate Program template" />
        <Helmet bodyAttributes={{ class: 'graduate-program-page' }} />

        { /**** Header and Title ****/ }
        <div id="rotator">
            <StaticImage src="https://preview-ugconthub.netlify.app/.netlify/images?w=1680&h=640&fit=cover&position=center&fm=webp&q=75&url=https%3A%2F%2Fapi.liveugconthub.uoguelph.dev%2Fsites%2Fdefault%2Ffiles%2F2024-01%2Flandscape-banner.png&cd=f47644471def04260b052e10cd3fa844" className="w-100" />
            <div className="container ft-container">
                <h1 className="fancy-title">Title</h1>
            </div>
        </div>
        
        { /**** Widgets content ****/}
        <div id="main-column">
            
        </div>
    </Layout>
)

const GradProgramTemplate = () => (
    <GradProgram />
)

export default GradProgramTemplate;
