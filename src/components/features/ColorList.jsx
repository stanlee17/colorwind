import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
// import { convertToRGB } from '../../utils/utils';

const ColorList = () => {
  const {
    isLoading: loadingList,
    error: errorList,
    data: listData,
  } = useList();

  function useList() {
    return useQuery('colorList', async () => {
      const { data } = await axios.get('http://colormind.io/list/');
      return data.result;
    });
  }

  if (loadingList) return 'Loading...';

  if (errorList) return 'An error has occurred: ' + errorList.message;

  return (
    <div className="color-list">
      {listData.slice(2).map((list, index) => (
        <h1 key={index}>{list}</h1>
      ))}
    </div>
  );
};

export default ColorList;
