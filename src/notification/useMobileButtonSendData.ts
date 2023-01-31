import { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import { INFINITE_SCROLL_LIMIT } from '../api/constValue';

interface MobileButton {
  token?: string;
  page: number;
}

export const useMobileButtonSendData = ({ token, page }: MobileButton) => {
  const [prevListLength, setPrevListLength] = useState(0);
  const [differenceListLength, setDifferenceListLength] = useState(0);

  const headers = {
    headers: { Authorization: `bearer ${token}` },
  };

  const fetchAllNotificationList = async () => await axios.get(`${END_POINT}/notifications`, headers);

  const saveNotificationLength = async () => {
    const res = await fetchAllNotificationList();
    const newListLength = res.data.length;
    setPrevListLength(newListLength);
    return updateDifferenceListLength(newListLength);
  };

  const updateDifferenceListLength = (currentListLength: number) => {
    const differenceLength = currentListLength - prevListLength;
    setDifferenceListLength(differenceLength);
    return differenceLength;
  };

  useEffect(() => {
    saveNotificationLength();
  }, []);

  const fetchNotificationData = async (differenceLength: number) => {
    const res = await axios.get(
      `${END_POINT}/notifications?offset=${0}&limit=${
        page * INFINITE_SCROLL_LIMIT + INFINITE_SCROLL_LIMIT + differenceLength
      }`,
      headers
    );

    return res.data;
  };

  const confirmMobileNotificationList = async () => {
    const differenceLength = differenceListLength === prevListLength ? 0 : differenceListLength;

    return await fetchNotificationData(differenceLength);
  };

  const renderRealTimeMobileNotificationList = async () => {
    const differenceLength = await saveNotificationLength();

    return await fetchNotificationData(differenceLength);
  };

  return { confirmMobileNotificationList, renderRealTimeMobileNotificationList };
};
