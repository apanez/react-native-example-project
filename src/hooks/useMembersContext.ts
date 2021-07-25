import {useContext} from 'react';
import MemberContext from '../context/MemberContext';

const useMembersContext: any = () => {
  return useContext(MemberContext);
};

export default useMembersContext;
