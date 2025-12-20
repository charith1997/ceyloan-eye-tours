import React from "react";

interface ChatLoadingProps {
  isUser?: boolean;
}

export function ChatLoading({ isUser = false }: ChatLoadingProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={isUser ? "20" : "40"}
      height={isUser ? "20" : "40"}
      style={{ display: "inline-block" }}
    >
      <circle
        fill="#CD1A40"
        stroke="#CD1A40"
        strokeWidth="15"
        r="15"
        cx="40"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.4"
          values="1;0.2;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        />
      </circle>
      <circle
        fill="#FF803C"
        stroke="#FF803C"
        strokeWidth="15"
        r="15"
        cx="100"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.4"
          values="1;0.2;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        />
      </circle>
      <circle
        fill="#CD1A40"
        stroke="#CD1A40"
        strokeWidth="15"
        r="15"
        cx="160"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.4"
          values="1;0.2;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        />
      </circle>
    </svg>
  );
}
