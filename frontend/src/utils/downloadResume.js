import jsPDF from "jspdf";

export const downloadResume = (resumeData, aiResume) => {
  const doc = new jsPDF();

  let y = 20;

  // ==========================
  // HEADER
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(resumeData.fullName || "Your Name", 20, y);

  y += 8;

  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.8);
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `${resumeData.email} | ${resumeData.phone}`,
    20,
    y
  );

  y += 6;

  doc.text(
    `${resumeData.location}`,
    20,
    y
  );

  y += 6;

  doc.text(
    `LinkedIn: ${resumeData.linkedin}`,
    20,
    y
  );

  y += 6;

  doc.text(
    `GitHub: ${resumeData.github}`,
    20,
    y
  );

  y += 12;

  // ==========================
  // PROFESSIONAL SUMMARY
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(37, 99, 235);
  doc.text("PROFESSIONAL SUMMARY", 20, y);

  y += 2;
  doc.setDrawColor(220);
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  const summary = doc.splitTextToSize(aiResume.summary, 170);
  doc.text(summary, 20, y);

  y += summary.length * 6 + 10;

  // ==========================
  // TECHNICAL SKILLS
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(37, 99, 235);
  doc.text("TECHNICAL SKILLS", 20, y);

  y += 2;
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  const skills = [...resumeData.skills, ...aiResume.skills];

  skills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 6;
  });

  y += 6;

  // ==========================
  // EXPERIENCE
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(37, 99, 235);
  doc.text("PROFESSIONAL EXPERIENCE", 20, y);

  y += 2;
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);

  doc.text(
    `${resumeData.role} | ${resumeData.company}`,
    20,
    y
  );

  y += 7;

  doc.setFont("helvetica", "normal");

  aiResume.experience.forEach((item) => {
    const lines = doc.splitTextToSize("• " + item, 165);
    doc.text(lines, 25, y);
    y += lines.length * 6;
  });

  y += 8;

  // ==========================
  // PROJECTS
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(37, 99, 235);
  doc.text("PROJECTS", 20, y);

  y += 2;
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);

  doc.text(resumeData.projectTitle, 20, y);

  y += 6;

  doc.setFont("helvetica", "italic");
  doc.text(`Technologies: ${resumeData.projectTech}`, 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  aiResume.project.forEach((item) => {
    const lines = doc.splitTextToSize("• " + item, 165);
    doc.text(lines, 25, y);
    y += lines.length * 6;
  });

  y += 8;

  // ==========================
  // EDUCATION
  // ==========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(37, 99, 235);
  doc.text("EDUCATION", 20, y);

  y += 2;
  doc.line(20, y, 190, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  doc.text(`Degree: ${resumeData.degree}`, 20, y);
  y += 6;

  doc.text(`College: ${resumeData.college}`, 20, y);
  y += 6;

  doc.text(`CGPA: ${resumeData.cgpa}`, 20, y);
  y += 6;

  doc.text(`Graduation Year: ${resumeData.graduationYear}`, 20, y);

  // ==========================

  doc.save(`${resumeData.fullName}_Resume.pdf`);
};