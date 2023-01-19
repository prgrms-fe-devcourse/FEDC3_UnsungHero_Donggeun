import { useState, useEffect } from 'react';
import { END_POINT } from '../api/apiAddress';
import useAxios from '../api/useAxios';
import { IAuth } from '../types/auth';

const useOverlapConfirm = () => {
  const [allFullNameList, setAllFullNameList] = useState<string[] | undefined>([]);
  const [allEmailList, setAllEmailList] = useState<string[] | undefined>([]);

  const { data: userData } = useAxios<IAuth[]>({
    url: `${END_POINT}/users/get-users`,
    method: 'get',
  });

  const getAllUserData = async () => {
    const allFullNameData = userData?.map((data: IAuth) => data.fullName);
    const allEmailData = userData?.map((data: IAuth) => data.email);
    setAllFullNameList(allFullNameData);
    setAllEmailList(allEmailData);
  };

  useEffect(() => {
    getAllUserData();
  }, [userData]);

  const CheckOverlapEmail = (email: string) => {
    return allEmailList?.indexOf(email) !== -1;
  };

  const CheckOverlapName = (fullName: string) => {
    return allFullNameList?.indexOf(fullName) !== -1;
  };

  return { CheckOverlapEmail, CheckOverlapName };
};

export default useOverlapConfirm;
