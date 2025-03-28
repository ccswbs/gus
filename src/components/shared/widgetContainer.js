import React from "react";
import Widget from "components/shared/widget";
import widgetModules from "components/shared/widgetModules";

const SortWidgets = (widgets) => {
  const sortedWidgets = [];
  let currentContainer = null;
  let containerHolder = [];

  widgets.forEach((widget) => {
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

const WidgetContainer = ({data}) => {
  const sortedWidgets = SortWidgets(data);
  return <>
    {sortedWidgets.map((widgetGroup, index) => (
      widgetGroup.container === "container" ?           
        <div className="container page-container" key={`widget-container-parent-${index}`}>
          <div className="row site-content">
            <div className="content-area">
              {widgetGroup.containerHolder.map((widget) => <Widget data={widget} key={widget.drupal_id} />)}
            </div> 
          </div>
        </div> : 
        <div key={`widget-container-parent-${index}`}>
          {widgetGroup.containerHolder.map((widget) => <Widget data={widget} key={widget.drupal_id} />)}
        </div>
    ))}
  </>
};

export default WidgetContainer;