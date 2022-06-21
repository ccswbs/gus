import React from "react"

const PageContainer = ({ children, className}) => (
  <div className={`container page-container ${className ?? '' }`}>
    {children}
  </div>
)

PageContainer.SiteContent = ({ children, className}) => (
  <PageContainer>
    <div className={`row site-content ${className ?? '' }`}>
      {children}
    </div>
  </PageContainer>
)

PageContainer.ContentArea = ({ children, className}) => (
  <div className={`content-area ${className ?? '' }`}>
    {children}
  </div>
)

PageContainer.FullWidth = ({ children, className}) => (
  <div className={`full-width-container ${className ?? '' }`}>
    {children}
  </div>
)

export default PageContainer
