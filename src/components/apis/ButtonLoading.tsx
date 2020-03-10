import { Button, Icon } from "@blueprintjs/core";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./ButtonLoading.css";

interface ButtonLoadingProps {
  className?: string;
  text: string;
  loading: boolean;
  success: boolean;
  onClick: () => void;
}

export function ButtonLoading({
  className,
  text,
  loading,
  success,
  onClick
}: ButtonLoadingProps) {
  // color of loader is blueprint @gray4
  return (
    <div className={className}>
      <Button text={text} intent="primary" onClick={onClick} />
      <div className="wi-button-loading">
        <ScaleLoader height={20} color="#A7B6C2" loading={loading} />
      </div>
      {success && (
        <Icon
          className="wi-button-success"
          icon="tick-circle"
          intent="success"
        />
      )}
    </div>
  );
}
