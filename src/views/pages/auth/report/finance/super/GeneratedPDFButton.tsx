// components/GeneratePdfButton.tsx
import React, { useRef } from 'react';
import ReactToPdf from 'react-to-pdf';

type GeneratePdfButtonProps = {
  targetRef: React.RefObject<HTMLElement>;
  filename: string;
  label: string;
};

const GeneratePdfButton: React.FC<GeneratePdfButtonProps> = ({ targetRef, filename, label }) => {
  // Optional custom options for ReactToPdf (like paper size, orientation, etc.)
  const options = {
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    x: 10,
    y: 10,
    scale: 1.5,
  };

  return (
    <ReactToPdf
      targetRef={targetRef}
      filename={filename}
      options={options}
      x={options.x}
      y={options.y}
      scale={options.scale}
    >
      {({ toPdf }: { toPdf: any }) => (
        <button
          onClick={() => toPdf()}
          className="bg-gray-900 text-green-300 px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          {label}
        </button>
      )}
    </ReactToPdf>
  );
};

export default GeneratePdfButton;
