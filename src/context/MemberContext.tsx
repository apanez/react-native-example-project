// import {AxiosResponse} from 'axios';
import axios from 'axios';
import React, {createContext, useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {IUsers} from './interface';

export interface IContextMember {
  isLoading: boolean;
  isSuccess: boolean;
  members?: IUsers[] | null;
  invalidateMembersCache?: () => void;
}

const MemberContext = createContext<IContextMember>({
  isLoading: false,
  isSuccess: false,
  members: null,
  invalidateMembersCache: () => {},
});

export default MemberContext;

const getUsers = async () => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

export const MemberContextProvider: React.FC<any> = ({children}) => {
  const {isSuccess, isLoading, data} = useQuery('Home', getUsers);
  const queryClient = useQueryClient();

  const invalidateMembersCache = useCallback(() => {
    return queryClient.invalidateQueries('Home');
  }, [queryClient]);

  const value = useMemo<IContextMember>(
    () => ({
      isLoading,
      isSuccess,
      members: data,
      invalidateMembersCache,
    }),
    [isLoading, isSuccess, data, invalidateMembersCache],
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};
