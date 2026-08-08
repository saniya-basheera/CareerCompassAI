import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadResume = async (resumeData, aiResume) => {
  try {
    const element = document.getElementById("resume-preview");

    if (!element) {
      throw new Error("Resume preview not found.");
    }

    // Clone the resume so we can modify colors only for PDF generation
    // without changing the actual preview on the screen.
    const clone = element.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.width = `${element.scrollWidth}px`;
    clone.style.background = "#ffffff";

    document.body.appendChild(clone);

    // Convert unsupported modern colors such as oklch()
    // to standard RGB colors.
    const allElements = clone.querySelectorAll("*");

    allElements.forEach((el) => {
      el.style.color = "#111827";
      el.style.backgroundColor = "transparent";
      el.style.borderColor = "#d1d5db";
    });

    // Keep the main resume background white.
    clone.style.backgroundColor = "#ffffff";

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;

    const availableWidth = pageWidth - margin * 2;

    const imageHeight =
      (canvas.height * availableWidth) / canvas.width;

    let heightLeft = imageHeight;
    let position = margin;

    // First page
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      availableWidth,
      imageHeight
    );

    heightLeft -= pageHeight - margin * 2;

    // Additional pages
    while (heightLeft > 0) {
      position = margin - (imageHeight - heightLeft);

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        availableWidth,
        imageHeight
      );

      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save(
      `${resumeData.fullName || "Resume"}_Resume.pdf`
    );

  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Failed to generate PDF. Check the browser console.");
  }
};