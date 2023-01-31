import { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from '../api/apiAddress';
import useInfiniteSendQuery from '../hooks/useInfiniteSendQuery';

interface MobileButton {
  token?: string;
  page: number;
}

const limit = 5;

export const useMobileButton = ({ token, page }: MobileButton) => {
  const [prevListLength, setPrevListLength] = useState(0);
  const [differenceListLength, setDifferenceListLength] = useState(0);
  const { sendQuery } = useInfiniteSendQuery(page);

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

  const confirmMobileNotificationList = async () => {
    const differenceLength = differenceListLength === prevListLength ? 0 : differenceListLength;
    const res = await axios.get(
      `${END_POINT}/notifications?offset=${0}&limit=${page * limit + limit + differenceLength}`,
      headers
    );

    return res.data;
  };

  const renderRealTimeMobileNotificationList = async () => {
    const differenceLength = await saveNotificationLength();

    const res = await axios.get(
      `${END_POINT}/notifications?offset=${0}&limit=${page * limit + limit + differenceLength}`,
      headers
    );

    return res.data;
  };

  //   const renderScrollMobileNotificationList = async () => {
  //     const differenceLength = differenceListLength === prevListLength ? 0 : differenceListLength;
  //     const res = await axios.get(
  //       `${END_POINT}notifications?offset=${page * limit + differenceLength}&limit=${limit}`,
  //       headers
  //     );

  //     // by 민형, 실시간 알람 확인 후 한번 스크롤을 내렸을 때 처리
  //     if (differenceLength !== 0) setPrevListLength(differenceLength);
  //     refetchNotificationList(res.data);
  //   };

  return { confirmMobileNotificationList, renderRealTimeMobileNotificationList };
};
