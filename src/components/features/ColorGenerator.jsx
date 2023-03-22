import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/GeneratePalette';

// Components
import CWButton from '../common/CWButton';
import ColorLock from './ColorLock';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';

// Utils
import { rgbToHex } from '../../utils/utils';
import { getContrast } from '../../utils/utils';

const ColorGenerator = ({ refetch }) => {
  const { colors, setColors } = useContext(ColorsContext);
  // console.log(colors);

  return (
    <div className="color-generator">
      <h1 className="color-generator__heading">Color Generator</h1>
      <p className="color-generator__paragraph">
        Press <b>spacebar</b> or click the <b>generate</b> button in order to
        generate new color palettes
      </p>
      <div className="color-generator__colors py-4">
        {colors.map((color, index) => {
          const hex = rgbToHex(color[0], color[1], color[2]);
          // console.log(hex);

          return (
            <div
              key={index}
              className="color-generator__color"
              style={{
                backgroundColor: hex,
                color: getContrast(hex),
              }}
            >
              <h5 className="color-generator__hex">{hex}</h5>
              <div className="color-generator__settings">
                <ColorLock hex={hex} />
                <ColorPicker hex={hex} index={index} />
                <ColorCopy hex={hex} />
              </div>
            </div>
          );
        })}
      </div>
      <CWButton onClick={refetch}>Generate</CWButton>
    </div>
  );
};

export default ColorGenerator;
