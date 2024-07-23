import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({ pdf }: { pdf: string }) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Document
      file={pdf}
      // eslint-disable-next-line react/jsx-no-bind
      onLoadSuccess={onDocumentLoadSuccess}
      className="flex flex-col items-center bg-gray-200 "
    >
      {Array.from(new Array(numPages), (_, index) => (
        <div className="my-5 w-[58%] " key={index}>
          <Page pageNumber={index + 1} renderAnnotationLayer={false} />
        </div>
      ))}
    </Document>
  );
}

export default PdfViewer;
