import { useState } from 'react';

import { createWorker } from 'tesseract.js';
import * as OEM from 'tesseract.js/src/constants/OEM';
import * as PSM from 'tesseract.js/src/constants/PSM';
import { validateLicensePlate } from '../utils/licensePlateValidation';

const useOCR = () => {
  const [orcResult, setOcrResult] = useState('');

  const loadFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      handleExtractData(imageDataUri);
    };
    reader.readAsDataURL(file);
  };

  const handleExtractData = async (imgUri) => {
    const worker = await createWorker({
      logger: message => console.log(message)
    });

    console.log(worker);
    await worker.loadLanguage('eng+osd');
    await worker.initialize('eng+osd');
    await worker.setParameters({
      tessedit_ocr_engine_mode: OEM.TESSERACT_LSTM_COMBINED,
      tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD,
      // tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '
      tessedit_char_whitelist: '0123456789ABEKMHOPCTYX'
    });

    const response = await worker.recognize(imgUri);
    console.log(response.data);
    console.log(response.data.confidence);

    const wordsArray = response.data.words;
    for (const word in wordsArray) {
      console.log(wordsArray[word].text);
      if (validateLicensePlate(wordsArray[word].text)) {
        console.log('YES');
        console.log(wordsArray[word].text);
        setOcrResult(wordsArray[word].text);
      }
    }

    await worker.terminate();
  };

  return {
    orcResult,
    loadFile,
  };
};

export default useOCR;