import styled from "styled-components";
import React from "react";
import { ColorName, Colors } from "../../GlobalStyle";

export interface ButtonProps extends ButtonLayoutProps {
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface ButtonLayoutProps {
  color?: ColorName;
  size?: ButtonSize;
  disabled?: boolean;
}

type ButtonSize = "normal" | "big";

export const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  href,
  children,
  className,
  color,
  size,
}) => {
  let StyledButton = DefaultButton;
  if (disabled) {
    StyledButton = DisabledButton;
  }
  return (
    <StyledButton
      color={color}
      size={size}
      onClick={onClick}
      href={href}
      target={"_blank"}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

const DefaultButton = styled.a<ButtonLayoutProps>`
  background-color: ${({ color }) => {
    return color ? Colors[color] : "black";
  }};
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: ${({ size }) => fontSize(size || "normal")}rem;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s;

  &:active {
    opacity: 0.7;
  }
`;

const DisabledButton = styled(DefaultButton)`
  --disabled-opacity: 0.3;
  opacity: var(--disabled-opacity);
  cursor: default;

  &:active {
    opacity: var(--disabled-opacity);
  }
`;

// in rem
const fontSize = (size: ButtonSize): number => {
  if (size === "normal") {
    return 0.9;
  }
  if (size === "big") {
    return 1.3;
  }
  return 0.9;
};
