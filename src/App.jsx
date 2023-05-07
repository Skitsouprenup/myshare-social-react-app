import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Feed, PinInfo, PinMaker } from './components/content/pinscomponents/contentlist';
import { Home, Login, Pins, UserProfile } from './components/container/containerlist';
import NotFound404 from './components/content/error/NotFound404';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.APP_GOOGLE_CLIENT_ID}>
      <main>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path='home' element={<Home />}>

            <Route path='pins' element={<Pins />}>
              <Route index element={<Feed />} />
              <Route path='category/:categoryType' element={<Feed categoryLink={true} />} />
              <Route path='pininfo/:pinId' element={<PinInfo />} />
              <Route path='newpin' element={<PinMaker />} />
              <Route path='pins/*' element={<Navigate to='*' replace />} />
            </Route>
            <Route path='profile/:profileId' element={<UserProfile />} />
            <Route path='home/*' element={<Navigate to='*' replace />} />
            <Route index element={<Navigate to='pins' replace />} />

          </Route>
          <Route path='*' element={<NotFound404 />}></Route>
        </Routes>
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;