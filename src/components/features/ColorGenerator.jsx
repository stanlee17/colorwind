import React, { useState, useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';

// Components
import CWButton from '../common/CWButton';
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
      <CWButton onClick={refetch} className="me-3">
        Generate
      </CWButton>
      <CWButton className="bg-success" onClick={() => setModalShow(true)}>
        Save
      </CWButton>
      <SaveModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ColorGenerator;
