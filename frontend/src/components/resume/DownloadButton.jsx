import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DownloadButton({ resumeRef }) {

  const downloadPDF = async () => {

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("ATS_Resume.pdf");
  };

  return (

    <div className="text-center my-8">

      <button
        onClick={downloadPDF}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
      >
        📥 Download Resume PDF
      </button>

    </div>

  );
}

export default DownloadButton;