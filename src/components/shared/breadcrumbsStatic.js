import React from 'react';

const BreadcrumbsStatic = ({ pageTitle }) => {
  return (
    <nav aria-label="breadcrumb">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="gus-breadcrumbs gus-breadcrumbs--collapse-on-mobile">
              <ol class="gus-breadcrumbs__list">
                <li class="gus-breadcrumbs__list-item">
                  <a href="https://www.uoguelph.ca">
                    <i aria-hidden="true" class="fa-sharp fa-light fa-home gus-breadcrumb__link"></i>
                    <span class="visually-hidden">U of G Homepage</span>
                  </a>
                </li>
                <li class="gus-breadcrumbs__list-item active" aria-current="page">{pageTitle}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbsStatic;