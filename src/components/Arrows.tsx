import { Button } from "@blueprintjs/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Arrows.css";

interface IArrowsProps {
  next?: (e: React.MouseEvent<HTMLElement>) => void;
  showBack?: boolean;
  showNext?: boolean;
}

export function Arrows({ next, showBack, showNext }: IArrowsProps) {
  const history = useHistory();

  return (
    <div className="arrows">
      {showBack && (
        <Button
          className="back"
          minimal={true}
          icon="arrow-left"
          onClick={history.goBack}
        />
      )}
      {showNext && (
        <Button
          className="next"
          minimal={true}
          rightIcon="arrow-right"
          onClick={next}
        />
      )}
    </div>
  );
}

Arrows.defaultProps = {
  showBack: true,
  showNext: true
};
