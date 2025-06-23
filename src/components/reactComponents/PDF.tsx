import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Configure the worker to use the local file
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const PDF = ({ url }: { url: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);

  // Load the PDF document once
  useEffect(() => {
    const loadPdf = async () => {
      try {
        console.log("Loading PDF from", url);
        const loadingTask = getDocument(url);
        const doc = await loadingTask.promise;
        console.log("PDF loaded with", doc.numPages, "pages");
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [url]);

  // Render the current page every time pdfDoc or pageNumber changes or the parent size changes
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc) return;
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const scale = window.innerWidth * 0.0007;
        console.log("Rendering page", pageNumber, "with scale:", scale);
        const viewport = page.getViewport({ scale });
        console.log("Rendering page", pageNumber, "with viewport:", viewport);

        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
          console.error("Canvas context not found");
          return;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        // viewport.width = 500;
        // viewport.height = 500;

        await page.render({ canvasContext: context, viewport }).promise;
        console.log("Page rendered");
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    // Initial render
    renderPage();

    // Update rendering on window resize
    const handleResize = () => renderPage();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pdfDoc, pageNumber]);

  return (
    <div>
      <canvas ref={canvasRef} id="pdf-canvas"></canvas>
      <div>
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDF;
