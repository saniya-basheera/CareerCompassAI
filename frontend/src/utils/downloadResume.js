import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadResume = async (resumeData, aiResume) => {
  let clone = null;

  try {
    const original = document.getElementById("resume-preview");

    if (!original) {
      alert("Resume preview not found.");
      return;
    }

    // =========================================================
    // 1. CREATE CLEAN PDF CLONE
    // =========================================================

    clone = original.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = "-100000px";
    clone.style.top = "0";

    // A4 content width
    clone.style.width = "794px";
    clone.style.maxWidth = "794px";

    clone.style.height = "auto";
    clone.style.minHeight = "0";

    clone.style.margin = "0";
    clone.style.padding = "45px";

    clone.style.boxSizing = "border-box";
    clone.style.background = "#ffffff";
    clone.style.color = "#111111";

    clone.style.overflow = "visible";

    document.body.appendChild(clone);

    // =========================================================
    // 2. REMOVE BUTTONS
    // =========================================================

    clone.querySelectorAll("button").forEach((button) => {
      button.remove();
    });

    // =========================================================
    // 3. REMOVE SCROLLING / HEIGHT LIMITS
    // =========================================================

    clone.querySelectorAll("*").forEach((node) => {
      node.style.maxHeight = "none";

      const computed = window.getComputedStyle(node);

      if (
        computed.overflow === "auto" ||
        computed.overflow === "scroll" ||
        computed.overflowY === "auto" ||
        computed.overflowY === "scroll"
      ) {
        node.style.overflow = "visible";
        node.style.overflowY = "visible";
      }
    });

    // =========================================================
    // 4. COPY SAFE COMPUTED COLORS
    // =========================================================

    const originalNodes = original.querySelectorAll("*");
    const clonedNodes = clone.querySelectorAll("*");

    const safeColor = (value, fallback) => {
      if (!value) return fallback;

      if (
        value.includes("oklch") ||
        value.includes("oklab")
      ) {
        return fallback;
      }

      return value;
    };

    originalNodes.forEach((originalNode, index) => {
      const clonedNode = clonedNodes[index];

      if (!clonedNode) return;

      const style = window.getComputedStyle(originalNode);

      clonedNode.style.color = safeColor(
        style.color,
        "#111111"
      );

      clonedNode.style.backgroundColor = safeColor(
        style.backgroundColor,
        "transparent"
      );

      clonedNode.style.borderTopColor = safeColor(
        style.borderTopColor,
        "transparent"
      );

      clonedNode.style.borderRightColor = safeColor(
        style.borderRightColor,
        "transparent"
      );

      clonedNode.style.borderBottomColor = safeColor(
        style.borderBottomColor,
        "transparent"
      );

      clonedNode.style.borderLeftColor = safeColor(
        style.borderLeftColor,
        "transparent"
      );

      clonedNode.style.fontFamily =
        style.fontFamily;

      clonedNode.style.fontSize =
        style.fontSize;

      clonedNode.style.fontWeight =
        style.fontWeight;

      clonedNode.style.lineHeight =
        style.lineHeight;

      clonedNode.style.letterSpacing =
        style.letterSpacing;
    });

    // =========================================================
    // 5. FIX OKLCH / OKLAB IN STYLE TAGS
    // =========================================================

    clone.querySelectorAll("style").forEach((styleTag) => {
      styleTag.textContent = styleTag.textContent
        .replace(
          /oklch\([^)]*\)/gi,
          "rgb(0, 0, 0)"
        )
        .replace(
          /oklab\([^)]*\)/gi,
          "rgb(0, 0, 0)"
        );
    });

    // =========================================================
    // 6. IMPORTANT:
    // KEEP SECTIONS TOGETHER WHEN POSSIBLE
    // =========================================================

    clone.querySelectorAll(".resume-section").forEach((section) => {
      section.style.breakInside = "avoid";
      section.style.pageBreakInside = "avoid";
    });

    // =========================================================
    // 7. WAIT FOR BROWSER TO FINISH LAYOUT
    // =========================================================

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    // =========================================================
    // 8. RENDER FULL RESUME
    // =========================================================

    const canvas = await html2canvas(clone, {
      scale: 2,

      useCORS: true,
      allowTaint: true,

      backgroundColor: "#ffffff",

      logging: false,

      windowWidth: 794,

      onclone: (documentClone) => {
        documentClone
          .querySelectorAll("button")
          .forEach((button) => button.remove());

        documentClone
          .querySelectorAll("style")
          .forEach((styleTag) => {
            styleTag.textContent =
              styleTag.textContent
                .replace(
                  /oklch\([^)]*\)/gi,
                  "rgb(0, 0, 0)"
                )
                .replace(
                  /oklab\([^)]*\)/gi,
                  "rgb(0, 0, 0)"
                );
          });

        const resume =
          documentClone.getElementById(
            "resume-preview"
          );

        if (resume) {
          resume.style.height = "auto";
          resume.style.minHeight = "0";
          resume.style.overflow = "visible";
        }
      },
    });

    // Remove clone
    document.body.removeChild(clone);
    clone = null;

    // =========================================================
    // 9. PDF DIMENSIONS
    // =========================================================

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;

    // Smaller margins = less unnecessary blank space
    const MARGIN_X = 10;
    const MARGIN_TOP = 8;
    const MARGIN_BOTTOM = 8;

    const CONTENT_WIDTH =
      PAGE_WIDTH - MARGIN_X * 2;

    const CONTENT_HEIGHT =
      PAGE_HEIGHT -
      MARGIN_TOP -
      MARGIN_BOTTOM;

    // =========================================================
    // 10. PIXEL -> MM CONVERSION
    // =========================================================

    const pixelsPerMM =
      canvas.width / CONTENT_WIDTH;

    const pageHeightPixels =
      Math.floor(
        CONTENT_HEIGHT * pixelsPerMM
      );

    // =========================================================
    // 11. GET SECTION POSITIONS
    //
    // This is the important fix.
    // We use the actual GeneratedResume sections
    // to determine safe places to split.
    // =========================================================

    const sections =
      Array.from(
        clone?.querySelectorAll(
          ".resume-section"
        ) || []
      );

    /*
     * clone has already been removed above, so we cannot
     * measure it here.
     *
     * Therefore we calculate safe breaks directly from
     * the rendered canvas using the original DOM.
     */

    const originalRect =
      original.getBoundingClientRect();

    const originalSections =
      Array.from(
        original.querySelectorAll(
          ".resume-section"
        )
      );

    const safeBreaks = [];

    originalSections.forEach((section) => {
      const rect =
        section.getBoundingClientRect();

      const relativeTop =
        rect.top - originalRect.top;

      const relativeBottom =
        rect.bottom - originalRect.top;

      const scale =
        canvas.width /
        originalRect.width;

      safeBreaks.push({
        top: Math.round(
          relativeTop * scale
        ),
        bottom: Math.round(
          relativeBottom * scale
        ),
      });
    });

    // =========================================================
    // 12. FIND BEST PAGE BREAK
    //
    // Never cut through a resume section if the whole
    // section can fit on the next page.
    //
    // Also DON'T push a section unnecessarily if there
    // is still useful space on the current page.
    // =========================================================

    const findBestBreak = (startY) => {
      const idealEnd =
        startY + pageHeightPixels;

      // If everything fits
      if (idealEnd >= canvas.height) {
        return canvas.height;
      }

      let bestBreak = idealEnd;

      // Look for a section boundary near the page edge
      for (const section of safeBreaks) {
        if (
          section.bottom > startY &&
          section.bottom <= idealEnd
        ) {
          bestBreak = section.bottom;
        }
      }

      /*
       * If a section starts before the page edge
       * but ends after it, don't cut it if we can
       * move the whole section.
       */
      for (const section of safeBreaks) {
        if (
          section.top > startY &&
          section.top < idealEnd &&
          section.bottom > idealEnd
        ) {
          const distance =
            idealEnd - section.top;

          /*
           * Only move to the section start when
           * the unused space is reasonably small.
           *
           * This prevents the huge blank space problem.
           */
          if (
            distance <=
            pageHeightPixels * 0.22
          ) {
            bestBreak = section.top;
          }

          break;
        }
      }

      // Safety: never create an empty page
      if (bestBreak <= startY) {
        bestBreak =
          Math.min(
            startY + pageHeightPixels,
            canvas.height
          );
      }

      return bestBreak;
    };

    // =========================================================
    // 13. CREATE PDF PAGES
    // =========================================================

    let currentY = 0;
    let pageNumber = 0;

    while (currentY < canvas.height - 1) {
      const breakY =
        findBestBreak(currentY);

      const sliceHeight =
        breakY - currentY;

      if (sliceHeight <= 0) {
        break;
      }

      // =======================================================
      // CREATE A CANVAS FOR THIS PAGE
      // =======================================================

      const pageCanvas =
        document.createElement("canvas");

      pageCanvas.width =
        canvas.width;

      pageCanvas.height =
        sliceHeight;

      const ctx =
        pageCanvas.getContext("2d");

      ctx.fillStyle = "#ffffff";

      ctx.fillRect(
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );

      ctx.drawImage(
        canvas,

        0,
        currentY,
        canvas.width,
        sliceHeight,

        0,
        0,
        canvas.width,
        sliceHeight
      );

      const imageData =
        pageCanvas.toDataURL(
          "image/png"
        );

      const imageHeight =
        sliceHeight / pixelsPerMM;

      // First page already exists
      if (pageNumber > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        "PNG",
        MARGIN_X,
        MARGIN_TOP,
        CONTENT_WIDTH,
        imageHeight,
        undefined,
        "FAST"
      );

      pageNumber++;

      currentY = breakY;
    }

    // =========================================================
    // 14. FILE NAME
    // =========================================================

    const cleanName = (
      resumeData.fullName ||
      "Resume"
    )
      .trim()
      .replace(
        /[^a-zA-Z0-9-_ ]/g,
        ""
      )
      .replace(/\s+/g, "_");

    pdf.save(
      `${cleanName}_Resume.pdf`
    );
  } catch (error) {
    console.error(
      "PDF generation error:",
      error
    );

    if (clone && clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }

    alert(
      "Failed to generate PDF. Check the browser console."
    );
  }
};