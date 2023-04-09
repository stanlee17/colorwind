import React, { useState, useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';
import { RiHeartLine } from 'react-icons/ri';
import { TfiExport } from 'react-icons/tfi';

// Components
import ColorButton from '../common/ColorButton';
import ColorLock from './ColorLock';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';
import SaveModal from './SaveModal';

// Utils
import { getContrast } from '../../utils/utils';

const ColorGenerator = ({ refetch }) => {
  const [modalShow, setModalShow] = useState(false);
  const { colors } = useContext(ColorsContext);

  return (
    <div className="color-generator">
      <div className="color-generator-colors py-4">
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className="color-generator-color"
              style={{
                backgroundColor: color.color,
                color: getContrast(color.color),
              }}
            >
              <h5 className="color-generator-hex">{color.color}</h5>
              <div className="color-generator-settings">
                <ColorLock hex={color.color} index={index} />
                <ColorPicker hex={color.color} index={index} />
                <ColorCopy hex={color.color} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="color-generator-btn">
        <div className="color-generator-btn-generate">
          <ColorButton onClick={refetch} className="me-3">
            Generate
          </ColorButton>
          or <strong>spacebar</strong> to generate new palettes
        </div>
        <div className="color-generator-btn-secondary">
          {/* <ColorButton secondary className="me-3" icon={<TfiExport />}>
            Export
          </ColorButton> */}
          <ColorButton
            secondary
            icon={<RiHeartLine />}
            onClick={() => setModalShow(true)}
          >
            Save
          </ColorButton>
        </div>
      </div>
      <SaveModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ColorGenerator;
