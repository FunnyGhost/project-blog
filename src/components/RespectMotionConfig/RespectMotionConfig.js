'use client';
import React from 'react';
import { MotionConfig } from 'framer-motion';

function RespectMotionConfig({ children }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}

export default RespectMotionConfig;
