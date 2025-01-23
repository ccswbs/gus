import React from "react";
import Widget from "components/shared/widget";
import widgetModules from "components/shared/widgetModules";

const SortWidgets = (widgets) => {
  const sortedWidgets = [];
  let currentContainer = null;
  let containerHolder = [];

  widgets.map((widget) => {
    let newContainer = "container";

    if (widgetModules[widget.__typename] && widgetModules[widget.__typename].container === "container-fluid") {
        newContainer = "container-fluid";
    }

    if (currentContainer !== newContainer) {
      if (currentContainer !== null) {
        sortedWidgets.push({container: currentContainer, containerHolder: containerHolder.slice()});
        containerHolder = [];
      }
      currentContainer = newContainer;
    }
    containerHolder.push(widget);
  });

  if (containerHolder.length > 0) {
    sortedWidgets.push({container: currentContainer, containerHolder});
  }
  return sortedWidgets;
}

const Widgets = ({widgetData}) => {
  const sortedWidgets = SortWidgets(widgetData);
  return <>
    {sortedWidgets.map((widgetGroup, index) => (
      widgetGroup.container === "container" ?           
        <div className="container page-container" key={index}>
          <div className="row site-content">
            <div className="content-area">
              {widgetGroup.containerHolder.map((widget) => <Widget widget={widget} key={widget.drupal_id} />)}
            </div> 
          </div>
        </div> : 
        <div key={index}>
          {widgetGroup.containerHolder.map((widget) => <Widget widget={widget} key={widget.drupal_id} />)}
        </div>
    ))}
  </>
};

export default Widgets;