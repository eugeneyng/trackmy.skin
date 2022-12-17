import * as React from 'react';
import User from './user';

currentUser = new User();

export default AuthContext = React.createContext(currentUser);
