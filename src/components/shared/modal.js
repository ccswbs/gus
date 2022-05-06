import React from "react"
import PropTypes from "prop-types"
import { Modal as BootstrapModal, Button } from "react-bootstrap"
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react"

import "../../styles/modal.css"

const Modal = NiceModal.create(
  // See allowed modalProps: https://react-bootstrap-v4.netlify.app/components/modal/#modal-props
  ({
    heading,
    content,
    buttonCloseText,
    buttonSubmitText,
    showHeader,
    showFooter,
    ...bootstrapModalProps
  }) => {
    const modal = useModal()
    return (
      <BootstrapModal
        {...{ ...bootstrapDialog(modal), ...bootstrapModalProps }}
      >
        {showHeader && heading && (
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>{heading}</BootstrapModal.Title>
          </BootstrapModal.Header>
        )}

        <BootstrapModal.Body>{content}</BootstrapModal.Body>

        {/* @todo: add handling for buttons if needed */}
        {showFooter && (
          <BootstrapModal.Footer>
            <Button variant="secondary" onClick={modal.hide}>
              {buttonCloseText}
            </Button>
            <Button variant="primary" onClick={modal.hide}>
              {buttonSubmitText}
            </Button>
          </BootstrapModal.Footer>
        )}
      </BootstrapModal>
    )
  }
)

Modal.propTypes = {
  content: PropTypes.any.isRequired,
  heading: PropTypes.any,
  buttonSubmitText: PropTypes.string,
  buttonCloseText: PropTypes.string,
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
}

Modal.defaultProps = {
  heading: "",
  buttonCloseText: "Close",
  buttonSubmitText: "Submit",
  showFooter: true,
  showHeader: true,
}

export { Modal, NiceModal as modalApi }
