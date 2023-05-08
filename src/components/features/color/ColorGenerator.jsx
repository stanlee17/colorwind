import React, { useContext } from 'react';
import { ColorsContext, ModalsContext } from '../../../App';

// react-icons
import { RiHeartLine } from 'react-icons/ri';
import { IoCodeSlash } from 'react-icons/io5';

// Components
import ColorLock from './ColorLock';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';

import ColorButton from '../../common/ColorButton';

import SaveModal from '../modals/SaveModal';
import ExportModal from '../modals/ExportModal';

// Utils
import { getContrast } from '../../../utils/utils';

const ColorGenerator = ({ refetch }) => {
  // useContext: ColorsContext & ModalsContext
  const { colors } = useContext(ColorsContext);
  const { modals, closeModal, openModal } = useContext(ModalsContext);

  return (
    <div className="color-generator">
      {/* Maps each color from API */}
      <div className="color-generator-colors py-4">
        {colors.map((color, index) => {
          const colorStyles = {
            backgroundColor: color.color,
            color: getContrast(color.color),
          };
          return (
            <div
              key={index}
              className="color-generator-color"
              style={colorStyles}
            >
              <div className="color-generator-content">
                <h5 className="color-generator-hex">{color.color}</h5>
                <p className="color-generator-name">{color.name}</p>
              </div>
              {/* Color generator settings */}
              <div className="color-generator-settings">
                <ColorLock hex={color.color} index={index} />
                <ColorPicker hex={color.color} index={index} />
                <ColorCopy hex={color.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Color Generator Buttons */}
      <div className="color-generator-btn">
        {/* Color Generator Generate Button */}
        <div className="color-generator-btn-generate">
          <ColorButton onClick={refetch}>Generate</ColorButton>
          <p className="color-generator-btn-text">
            or <strong>spacebar</strong> to generate new palettes
          </p>
        </div>
        {/* Color Generator Export & Save Buttons */}
        <div className="color-generator-btn-secondary">
          <ColorButton
            secondary
            icon={<IoCodeSlash />}
            className="color-generator-btn-export"
            onClick={() => openModal('exportModal')}
          >
            Export
          </ColorButton>
          <ColorButton
            secondary
            icon={<RiHeartLine />}
            className="color-generator-btn-save"
            onClick={() => openModal('saveModal')}
          >
            Save
          </ColorButton>
        </div>
      </div>

      {/* Modals */}
      <SaveModal closeModal={closeModal} saveModal={modals.saveModal} />
      <ExportModal closeModal={closeModal} exportModal={modals.exportModal} />
    </div>
  );
};

export default ColorGenerator;
