import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loading } from './modules/shared';

const Register = lazy(() =>
  import('./modules/data').then((module) => ({
    default: module.Register,
  }))
);

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
