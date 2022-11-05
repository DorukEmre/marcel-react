import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
}

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={props.className}>
          <p id="modal-modal-description" variant="h6" component="h2">
            {props.modalMsg}
          </p>
          {props.displayButton && (
            <>
              <button
                className={props.buttonClass}
                onClick={props.handleCloseModal}
              >
                {props.buttonText}
              </button>
            </>
          )}

          {props.displayAnimation && <div className="dot-elastic"></div>}
        </Box>
      </Modal>
    </div>
  )
}
