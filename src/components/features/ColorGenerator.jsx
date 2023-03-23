import React, { useContext, useEffect } from 'react';
import { ColorsContext } from '../../pages/GeneratePalette';

// Components
import CWButton from '../common/CWButton';
import ColorLock from './ColorLock';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';

// Utils
import { getContrast } from '../../utils/utils';

const ColorGenerator = ({ refetch }) => {
  const { colors } = useContext(ColorsContext);

  return (
    <div className="color-generator">
      <h1 className="color-generator__heading">Color Generator</h1>
      <p className="color-generator__paragraph">
        Press <b>spacebar</b> or click the <b>generate</b> button in order to
        generate new color palettes
      </p>
      <div className="color-generator__colors py-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-generator__color"
            style={{
              backgroundColor: color.color,
              color: getContrast(color.color),
            }}
          >
            <h5 className="color-generator__hex">{color.color}</h5>
            <div className="color-generator__settings">
              <ColorLock hex={color.color} index={index} />
              <ColorPicker hex={color.color} index={index} />
              <ColorCopy hex={color.color} />
            </div>
          </div>
        ))}
      </div>
      <CWButton onClick={refetch}>Generate</CWButton>
    </div>
  );
};

export default ColorGenerator;
