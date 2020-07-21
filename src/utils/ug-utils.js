function stripHTMLTags(content) {
    return content !== null ? content.replace(/(<([^>]+)>)/ig,"") : ``;
  }
  export { stripHTMLTags };