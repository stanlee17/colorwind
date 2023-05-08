import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import convert from 'color-convert';
import ColorButton from '../../common/ColorButton';
import { ColorsContext } from '../../../App';

// useCopyToClipboard hook
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

// Common components
import Message from '../../common/Message';

// Utils
import {
  getContrast,
  convertToCss,
  convertToScss,
  convertToJSON,
} from '../../../utils/utils';

// react-icons import
import {
  IoClose,
  IoCopySharp,
  IoCopyOutline,
  IoCheckmarkDone,
} from 'react-icons/io5';

const ExportModal = ({ exportModal, closeModal }) => {
  // useContext: ColorsContext
  const { colors } = useContext(ColorsContext);

  // Initial states
  const [colorCode, setColorCode] = useState('hex');
  const [codeFormat, setCodeFormat] = useState('css');

  // Copy To Clipboard Hook
  const [isCopied, handleCopy] = useCopyToClipboard(3000);

  // Color formats
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
    } else if (codeFormat === 'raw') {
      return converted.slice(0, -1);
    }
    return converted;
  }

  function getConvertedCode(name, color) {
    return `${getCodeFormat(name)} ${getColorCode(color)}`;
  }

  function handleCopyAll() {
    const copy = [];
    colors.forEach((color) => {
      copy.push(getConvertedCode(color.name, color.color));
    });

    const copyAll = copy.join('\n');
    handleCopy(copyAll);
  }

  return (
    <Modal
      isOpen={exportModal}
      onRequestClose={() => closeModal('exportModal')}
      contentLabel="Save Modal"
      className="export-modal"
      overlayClassName="export-modal-overlay"
    >
      <div className="export-modal-header">
        <h5>Export Palette</h5>
        <IoClose size={25} onClick={() => closeModal('exportModal')} />
      </div>
      <div className="export-modal-options">
        <div className="color-codes" onClick={handleColorCodes}>
          {colorCodes.map((color, index) => {
            return (
              <div
                id={color}
                style={{ color: colorCode === color && '#ec35c4' }}
                key={index}
              >
                {color.toUpperCase()}
              </div>
            );
          })}
        </div>
        <div className="code-format" onClick={handleCodeFormat}>
          {codeFormats.map((format, index) => {
            return (
              <div
                id={format}
                style={{ color: codeFormat === format && '#ec35c4' }}
                key={index}
              >
                {format.toUpperCase()}
              </div>
            );
          })}
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
                <p>{getConvertedCode(color.name, color.color)}</p>
                <IoCopySharp
                  onClick={() =>
                    handleCopy(getConvertedCode(color.name, color.color))
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="export-modal-buttons">
          <ColorButton
            secondary
            icon={<IoCopyOutline />}
            className="me-3"
            onClick={handleCopyAll}
          >
            Copy All
          </ColorButton>
          <ColorButton
            icon={<IoCheckmarkDone />}
            onClick={() => closeModal('exportModal')}
          >
            Done
          </ColorButton>
        </div>
        {isCopied && (
          <Message className="text-center mt-4" variant="error">
            Copied to Clipboard!
          </Message>
        )}
      </div>
    </Modal>
  );
};

export default ExportModal;
