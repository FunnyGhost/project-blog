'use client';

import React, { useEffect, useId, useState } from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = useId();
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const onPlayClick = () => {
    setIsPlaying(true);
    const newInterval = setInterval(() => setTimeElapsed((oldValue) => oldValue + 1), 1000);
    setIntervalId(newInterval);
  };

  const onPauseClick = () => {
    setIsPlaying(false);
    clearInterval(intervalId);
    setIntervalId(0);
  };

  const onResetClick = () => {
    setTimeElapsed(0);
    clearInterval(intervalId);
    setIntervalId(0);
    setIsPlaying(false);
  };

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <motion.div layoutId={id} className={styles.selectedColorOutline} />}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}>
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {isPlaying ? (
            <button onClick={onPauseClick}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button onClick={onPlayClick}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button onClick={onResetClick}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
