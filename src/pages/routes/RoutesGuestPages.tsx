/**
 * RoutesGuestPages - KOMCA 패턴
 * 비로그인 사용자용 라우트
 * Host에서 /portfolio/* 경로로 매핑됨
 */

import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesGuestPages() {
    return (
        <Routes>
            {/* /portfolio → HomePage */}
            <Route path="/" element={<HomePage />} />
            {/* catch-all 제거 - Host가 다른 경로 처리 */}
        </Routes>
    );
}

export { RoutesGuestPages };
