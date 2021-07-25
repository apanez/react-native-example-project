import axios from 'axios';
import {useQuery} from 'react-query';

const GET_MEMBER = 'GET_MEMBER';

const useMember = ({memberId}: any) => {
  const getUser = async () => {
    const {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${memberId}`,
    );
    return data;
  };

  return useQuery([GET_MEMBER, memberId], getUser);
};

export default useMember;
