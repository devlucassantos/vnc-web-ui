import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from './styles.module.scss';

const customStyle = document.createElement('style');
customStyle.innerHTML = `
  .rpv-default-layout__container {
    border: none !important;
  }
`;
document.head.appendChild(customStyle);

const PdfViewer: React.FC<{ pdfUrl: any }> = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(1);

    return (
        <div className={styles.pdfViewer}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[
                        defaultLayoutPlugin({
                            sidebarTabs: (defaultTabs) =>
                                numPages > 1 ? [...defaultTabs] : defaultTabs,
                        }),
                    ]}
                />
            </Worker>
        </div>
    );
};

export default PdfViewer;
