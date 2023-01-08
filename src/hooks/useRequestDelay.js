import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const useRequestDelay = (delayTime = 2000, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [errorMessage, setErrorMessage] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const delayFunc = async () => {
      try {
        await delay(delayTime);
        // throw "HAD ERROR.";
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(data);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setErrorMessage(error);
      }
    };
    delayFunc();
  }, []);

  const updateRecord = (recordUpdated, doneCallback) => {
    const newRecords = data.map((rec) => {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    const delayFunc = async () => {
      try {
        await delay(delayTime);
        if (doneCallback) {
          doneCallback();
        }
        setData(newRecords);
      } catch (error) {
        console.log("error thrown in updateRecord delayfunc", error);
        // setRequestStatus(REQUEST_STATUS.FAILURE);
        // setErrorMessage(error);
      }
    };
    delayFunc();
  };

  return {
    data,
    requestStatus,
    errorMessage,
    updateRecord,
  };
};

export default useRequestDelay;