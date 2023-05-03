import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import convert from 'color-convert';
import ColorButton from '../common/ColorButton';

// ColorsContext
import { ColorsContext } from '../../App';

// Utils
import {
  getContrast,
  convertToCss,
  convertToScss,
  convertToJSON,
  hexToRgb,
} from '../../utils/utils';

// Icons
import { IoClose, IoCopyOutline, IoCheckmarkDone } from 'react-icons/io5';

const ExportModal = ({ exportModal, closeModals }) => {
  // useContext
  const { colors } = useContext(ColorsContext);

  // useState
  const [colorCode, setColorCode] = useState('hex');
  const [codeFormat, setCodeFormat] = useState('css');
  const [convertedColor, setConvertedColor] = useState([]);

  const colorCodes = ['hex', 'rgb', 'hsl', 'cmyk'];
  const codeFormats = ['css', 'scss', 'json', 'raw'];

  function handleColorCodes(e) {
    const id = e.target.id;

    if (id) {
      return setColorCode(id);
    }
  }

  function handleCodeFormat(e) {
    const id = e.target.id;

    if (id) {
      return setCodeFormat(id);
    }
  }

  function getCodeFormat(colorName) {
    let converted;
    switch (codeFormat) {
      case 'css':
        converted = convertToCss(colorName);
        break;
      case 'scss':
        converted = convertToScss(colorName);
        break;
      case 'json':
        converted = convertToJSON(colorName);
        break;
      default:
        converted = '';
    }
    return converted;
  }

  function getColorCode(color) {
    let converted;

    switch (colorCode) {
      case 'hex':
        converted = `${color};`;
        break;
      case 'rgb':
        converted = `(${convert.hex.rgb(color).join(', ')});`;
        break;
      case 'hsl':
        const hslArr = convert.hex.hsl(color);
        converted = `hsl(${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%);`;
        break;
      case 'cmyk':
        converted = `cmyk(${convert.hex.cmyk(color).join('%, ')}%);`;
        break;
      default:
        converted = color;
    }

    if (codeFormat === 'json') {
      return `"${converted.slice(0, -1)}",`;
    }

    return converted;
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
          <div id="raw" style={{ color: codeFormat === 'raw' && '#ec35c4' }}>
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
                {getCodeFormat(color.name)} {getColorCode(color.color)}
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
