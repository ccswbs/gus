import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from 'components/layout';
import Seo from 'components/seo';
import Breadcrumbs from 'components/shared/breadcrumbs';
import SocioEconomicBanner from 'components/blocks/socioeconomic/banner';

const SocioEconomicImpactPage = (title) => (
    <Layout>
        <Helmet bodyAttributes={{ class: 'basic-page' }} />
        <Seo title={title} />
        <SocioEconomicBanner />
        <Breadcrumbs />
        
        { /**** Body content ****/ }
        <div className="container page-container">

            { /**** Widgets content ****/}      
            <div id="content" className="row row-with-vspace site-content">
                <section className="col-md-9 content-area">
                </section>
                <aside id="sidebar-right" className="col-md-3 content-area">
                    
                </aside>
            </div>
        </div>
    </Layout>
)

const SocioEconomicImpactPageData = () => (
    SocioEconomicImpactPage("Socio-Economic Impact Report")
)

export default SocioEconomicImpactPage;


