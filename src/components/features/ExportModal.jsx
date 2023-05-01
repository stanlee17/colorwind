import React, { useContext } from 'react';
import Modal from 'react-modal';
import ColorButton from '../common/ColorButton';

// useContext
import { ColorsContext } from '../../App';

// Utils
import { getContrast } from '../../utils/utils';

// Icons
import { IoClose, IoCopyOutline, IoCheckmarkDone } from 'react-icons/io5';

const ExportModal = ({ exportModal, closeModals }) => {
  const { colors } = useContext(ColorsContext);

  return (
    <Modal
      isOpen={exportModal}
      onRequestClose={() => closeModals('exportModal')}
      contentLabel="Save Modal"
      className="export-modal"
      overlayClassName="export-modal-overlay"
    >
      <div className="export-modal-header">
        <h5>Export Palette</h5>
        <IoClose size={25} onClick={() => closeModals('exportModal')} />
      </div>
      <div className="export-modal-options">
        <div>HEX</div>
        <div>RGB</div>
        <div>HSL</div>
        <div>CMYK</div>
        <div>CSS</div>
        <div>SCSS</div>
        <div>JSON</div>
        <div>RAW</div>
      </div>
      <div className="export-modal-content">
        <div className="export-modal-colors">
          {colors.map((color, index) => {
            const colorStyles = {
              backgroundColor: color.color,
              color: getContrast(color.color),
            };
            return (
              <div
                key={index}
                className="export-modal-color"
                style={colorStyles}
              >
                {color.name} {color.color}
              </div>
            );
          })}
        </div>
        <div className="export-modal-buttons">
          <ColorButton secondary icon={<IoCopyOutline />} className="me-3">
            Copy All
          </ColorButton>
          <ColorButton icon={<IoCheckmarkDone />}>Done</ColorButton>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
