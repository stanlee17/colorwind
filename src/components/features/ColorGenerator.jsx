import React, { useContext } from 'react';
import { ColorsContext, ModalsContext } from '../../App';

// Icons
import { RiHeartLine } from 'react-icons/ri';
import { IoCodeSlash } from 'react-icons/io5';

// Components
import ColorButton from '../common/ColorButton';
import ColorLock from './ColorLock';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';
import SaveModal from './SaveModal';
import ExportModal from './ExportModal';

// Utils
import { getContrast } from '../../utils/utils';

const ColorGenerator = ({ refetch }) => {
  // useState

  // useContext
  const { colors } = useContext(ColorsContext);
  const { modals, closeModals, openModals } = useContext(ModalsContext);

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
        <div className="color-generator-btn-generate">
          <ColorButton onClick={refetch} className="me-3">
            Generate
          </ColorButton>
          <p className="color-generator-btn-text">
            or <strong>spacebar</strong> to generate new palettes
          </p>
        </div>
        <div className="color-generator-btn-secondary">
          <ColorButton
            secondary
            icon={<IoCodeSlash />}
            className="me-3"
            onClick={() => openModals('exportModal')}
          >
            Export
          </ColorButton>
          <ColorButton
            secondary
            icon={<RiHeartLine />}
            onClick={() => openModals('saveModal')}
          >
            Save
          </ColorButton>
        </div>
      </div>

      {/* Modals */}
      <SaveModal closeModals={closeModals} saveModal={modals.saveModal} />
      <ExportModal closeModals={closeModals} exportModal={modals.exportModal} />
    </div>
  );
};

export default ColorGenerator;
