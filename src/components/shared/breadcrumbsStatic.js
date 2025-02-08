import React from 'react';

const BreadcrumbsStatic = ({ pageTitle }) => {
  return (
    <nav aria-label="breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="gus-breadcrumbs gus-breadcrumbs--collapse-on-mobile">
              <ol className="gus-breadcrumbs__list">
                <li className="gus-breadcrumbs__list-item">
                  <a href="https://www.uoguelph.ca">
                    <i aria-hidden="true" className="fa-sharp fa-light fa-home gus-breadcrumb__link"></i>
                    <span className="visually-hidden">U of G Homepage</span>
                  </a>
                </li>
                <li className="gus-breadcrumbs__list-item active" aria-current="page">{pageTitle}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbsStatic;