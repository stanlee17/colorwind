import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ColorButton from '../common/ColorButton';

// ColorsContext
import { ColorsContext } from '../../App';

// Utils
import { getContrast } from '../../utils/utils';

// Icons
import { IoClose, IoCopyOutline, IoCheckmarkDone } from 'react-icons/io5';

const ExportModal = ({ exportModal, closeModals }) => {
  // useContext
  const { colors } = useContext(ColorsContext);

  // useState
  const [colorCode, setColorCode] = useState('hex');
  const [codeFormat, setCodeFormat] = useState('css');

  function handleColorCodes(e) {
    const id = e.target.id;
    console.log(id);
    setColorCode(id);
  }

  function handleCodeFormat(e) {
    const id = e.target.id;
    console.log(id);
    setCodeFormat(id);
  }

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
        <div className="color-codes" onClick={handleColorCodes}>
          <div id="hex" style={{ color: colorCode === 'hex' && '#ec35c4' }}>
            HEX
          </div>
          <div id="rgb" style={{ color: colorCode === 'rgb' && '#ec35c4' }}>
            RGB
          </div>
          <div id="hsl" style={{ color: colorCode === 'hsl' && '#ec35c4' }}>
            HSL
          </div>
          <div id="cmyk" style={{ color: colorCode === 'cmyk' && '#ec35c4' }}>
            CMYK
          </div>
        </div>
        <div className="code-format" onClick={handleCodeFormat}>
          <div id="css" style={{ color: codeFormat === 'css' && '#ec35c4' }}>
            CSS
          </div>
          <div id="scss" style={{ color: codeFormat === 'scss' && '#ec35c4' }}>
            SCSS
          </div>
          <div id="json" style={{ color: codeFormat === 'json' && '#ec35c4' }}>
            JSON
          </div>
          <div id="raw" style={{ color: codeFormat === 'json' && '#ec35c4' }}>
            RAW
          </div>
        </div>
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
          <ColorButton
            icon={<IoCheckmarkDone />}
            onClick={() => closeModals('exportModal')}
          >
            Done
          </ColorButton>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
