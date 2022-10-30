import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import EasyCropper from './EasyCropper'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
}

export default function CropperModal(props) {
  return (
    <div>
      <Modal open={props.openModal} onClose={props.handleCloseModal}>
        <Box sx={style} className={props.className}>
          <EasyCropper handleCropSave={props.handleCropSave} />
        </Box>
      </Modal>
    </div>
  )
}
