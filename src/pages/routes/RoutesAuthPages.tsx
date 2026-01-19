/**
 * RoutesAuthPages - KOMCA 패턴
 * 로그인 사용자용 라우트
 * Host에서 /portfolio/* 경로로 매핑됨
 */

import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesAuthPages() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}

export { RoutesAuthPages };
