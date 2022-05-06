const React = require("react")
const NiceModal = require("@ebay/nice-modal-react")

exports.wrapRootElement = ({ element }) => {
  return <NiceModal.Provider>{element}</NiceModal.Provider>
}
