import React from 'react'

import Layout from 'components/layout'
import Seo from 'components/seo'
import {Script} from "gatsby";
import { Parser } from 'html-to-react';

const slateTest = '<div id="form_adef857c-e5f4-4393-ab19-598c524bf979">Loading...</div><script async="async" src="https://apply.uoguelph.ca/register/?id=adef857c-e5f4-4393-ab19-598c524bf979&amp;output=embed&amp;div=form_adef857c-e5f4-4393-ab19-598c524bf979"></script>';
const TestPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>Testing Slate Form</h1>
    <div id="form_adef857c-e5f4-4393-ab19-598c524bf979">Loading...</div>
    <Script async={true} src={'https://apply.uoguelph.ca/register/?id=adef857c-e5f4-4393-ab19-598c524bf979&amp;output=embed&amp;div=form_adef857c-e5f4-4393-ab19-598c524bf979'} />
  </Layout>
)

export default TestPage
