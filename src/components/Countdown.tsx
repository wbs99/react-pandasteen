import React, { useState, useEffect } from "react";

type CountdownProps = {
  initialSeconds: number;
  onCountdownComplete?: () => void;
};

const useCountdown = ({ initialSeconds, onCountdownComplete }: CountdownProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onCountdownComplete?.();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsRemaining, onCountdownComplete]);

  return secondsRemaining;
};

export const Countdown = ({ initialSeconds, onCountdownComplete }: CountdownProps) => {
  const secondsRemaining = useCountdown({ initialSeconds, onCountdownComplete });

  return <div>{secondsRemaining}</div>;
}