import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { useState } from 'react';
import profileImage from '../assets/profile.jpeg';
import styles from './ExportPDF.module.css';
import type { ExperienceItem, Skills, ContactInfo } from '../types';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export const ExportPDF = () => {
  const { t, i18n } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Constants & Colors
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      
      // Modern color palette
      const colors = {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: '#1e293b',
        text: '#334155',
        light: '#64748b',
        border: '#e2e8f0',
      };

      let y = margin;

      // Helper functions
      const addPage = () => {
        doc.addPage();
        y = margin;
      };

      const checkPageBreak = (needed: number): boolean => {
        if (y + needed > pageHeight - margin) {
          addPage();
          return true;
        }
        return false;
      };

      const drawSectionTitle = (title: string) => {
        checkPageBreak(15);
        
        // Draw accent line
        doc.setDrawColor(colors.primary);
        doc.setLineWidth(0.8);
        doc.line(margin, y, margin + 40, y);
        
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.primary);
        doc.text(title.toUpperCase(), margin, y);
        y += 7;
      };

      // Load profile image
      const img = new Image();
      img.src = profileImage;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      // ============ HEADER SECTION ============
      // Gradient-like header bar
      doc.setFillColor(colors.primary);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Profile image with border
      const imgSize = 32;
      const imgX = margin;
      const imgY = 6;
      
      // White border around image
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(imgX - 1, imgY - 1, imgSize + 2, imgSize + 2, 2, 2, 'F');
      doc.addImage(img, 'JPEG', imgX, imgY, imgSize, imgSize);
      
      // Name and title
      const name = t('name');
      const title = t('title');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(name, margin + imgSize + 8, 18);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(220, 230, 255);
      doc.text(title, margin + imgSize + 8, 26);
      
      // Contact info in header (without emojis)
      const contact: ContactInfo = {
        email: t('contact.email'),
        phone: t('contact.phone'),
        location: t('contact.location'),
        linkedin: t('contact.linkedin'),
      };
      
      doc.setFontSize(8);
      doc.setTextColor(220, 230, 255);
      doc.text(contact.email, margin + imgSize + 8, 34);
      doc.text(`Tel: ${contact.phone}`, margin + imgSize + 8, 39);
      doc.text(contact.location, margin + imgSize + 8, 44);
      
      // LinkedIn on right side
      doc.setTextColor(180, 200, 255);
      doc.text('linkedin.com/in/jhulianramirez', pageWidth - margin, 34, { align: 'right' });
      
      y = 58;

      // ============ PROFILE SECTION ============
      drawSectionTitle(t('sections.profile'));
      
      const profileText = t('profile');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(colors.text);
      const profileLines = doc.splitTextToSize(profileText, contentWidth);
      doc.text(profileLines, margin, y);
      y += profileLines.length * 4 + 8;

      // ============ SKILLS SECTION (Compact Grid) ============
      checkPageBreak(45);
      drawSectionTitle(t('sections.skills'));
      
      const skills = t('skills', { returnObjects: true }) as Skills;
      const skillKeys = Object.keys(skills) as (keyof Skills)[];
      
      // Display skills in compact 2-column format
      const colWidth = contentWidth / 2 - 5;
      let col = 0;
      let rowY = y;
      let maxRowHeight = 0;
      
      skillKeys.forEach((key) => {
        const categoryTitle = t(`sections.${key}`);
        const categorySkills = skills[key];
        if (!Array.isArray(categorySkills)) return;
        
        const xPos = col === 0 ? margin : margin + colWidth + 10;
        
        // Category name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(colors.secondary);
        doc.text(categoryTitle.toUpperCase(), xPos, rowY);
        
        // Skills as compact list
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.light);
        const skillsText = categorySkills.join(' | ');
        const skillLines = doc.splitTextToSize(skillsText, colWidth - 5);
        doc.text(skillLines, xPos, rowY + 3.5);
        
        const blockHeight = 3.5 + skillLines.length * 3.5;
        maxRowHeight = Math.max(maxRowHeight, blockHeight);
        
        if (col === 0) {
          col = 1;
        } else {
          col = 0;
          rowY += maxRowHeight + 4;
          maxRowHeight = 0;
          if (rowY > y) y = rowY;
        }
      });
      
      if (col === 1) y = rowY + maxRowHeight + 6;
      else y += 4;

      // ============ EXPERIENCE SECTION ============
      checkPageBreak(30);
      drawSectionTitle(t('sections.experience'));
      
      const experience = t('experience', { returnObjects: true }) as ExperienceItem[];
      
      experience.forEach((exp, idx) => {
        // Check for page break before each experience
        checkPageBreak(40);
        
        // Company and period on same line
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(colors.dark);
        doc.text(exp.company, margin, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.light);
        doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
        y += 5;
        
        // Position on its own line
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(colors.secondary);
        doc.text(exp.position, margin, y);
        y += 4;
        
        // Project on its own line (if exists)
        if (exp.project) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(8);
          doc.setTextColor(colors.accent);
          const projectLabel = i18n.language === 'es' ? 'Proyecto: ' : 'Project: ';
          doc.text(projectLabel + exp.project, margin, y);
          y += 4;
        }
        
        // Description (if exists and not empty)
        if (exp.description && exp.description.trim()) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(colors.text);
          const descLines = doc.splitTextToSize(exp.description, contentWidth);
          doc.text(descLines, margin, y);
          y += descLines.length * 3.2 + 2;
        }
        
        // Highlights (max 3 for conciseness)
        const displayHighlights = exp.highlights.slice(0, 3);
        displayHighlights.forEach((highlight) => {
          checkPageBreak(10);
          
          // Bullet point as dash
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(colors.primary);
          doc.text('-', margin + 2, y);
          
          doc.setTextColor(colors.text);
          const highlightLines = doc.splitTextToSize(highlight, contentWidth - 8);
          doc.text(highlightLines, margin + 6, y);
          y += highlightLines.length * 3.2 + 1.5;
        });
        
        // Separator between experiences (except last)
        if (idx < experience.length - 1) {
          y += 3;
          doc.setDrawColor(colors.border);
          doc.setLineWidth(0.2);
          doc.line(margin, y, pageWidth - margin, y);
          y += 5;
        }
      });

      y += 5;

      // ============ EDUCATION SECTION ============
      checkPageBreak(25);
      drawSectionTitle(t('sections.education'));
      
      const education = t('education', { returnObjects: true }) as EducationItem[];
      
      education.forEach((edu) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(colors.dark);
        doc.text(edu.degree, margin, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.light);
        doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
        y += 4;
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(colors.secondary);
        doc.text(edu.institution, margin, y);
        y += 8;
      });

      // ============ CERTIFICATIONS (Compact) ============
      checkPageBreak(30);
      drawSectionTitle(t('sections.certifications'));
      
      const certifications = t('certifications', { returnObjects: true }) as CertificationItem[];
      
      // Show only main certifications (first 6)
      const mainCerts = certifications.slice(0, 6);
      const otherCertsCount = certifications.length - 6;
      
      // 2 columns for certifications
      const certColWidth = contentWidth / 2 - 3;
      let certCol = 0;
      let certRowY = y;
      let certMaxRowHeight = 0;
      
      mainCerts.forEach((cert) => {
        const xPos = certCol === 0 ? margin : margin + certColWidth + 6;
        const localY = certRowY;
        
        // Cert name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(colors.dark);
        const certNameLines = doc.splitTextToSize(cert.name, certColWidth - 3);
        doc.text(certNameLines, xPos, localY);
        
        // Issuer and date
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(colors.light);
        doc.text(`${cert.issuer} - ${cert.date}`, xPos, localY + certNameLines.length * 3 + 1);
        
        const blockHeight = certNameLines.length * 3 + 6;
        certMaxRowHeight = Math.max(certMaxRowHeight, blockHeight);
        
        if (certCol === 0) {
          certCol = 1;
        } else {
          certCol = 0;
          certRowY += certMaxRowHeight + 2;
          certMaxRowHeight = 0;
        }
      });
      
      y = certRowY + (certCol === 1 ? certMaxRowHeight + 5 : 3);
      
      // Mention additional certs
      if (otherCertsCount > 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(colors.light);
        const additionalText = i18n.language === 'es' 
          ? `+ ${otherCertsCount} certificaciones adicionales de Platzi`
          : `+ ${otherCertsCount} additional Platzi certifications`;
        doc.text(additionalText, margin, y);
      }

      // ============ FOOTER ============
      const footerY = pageHeight - 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(colors.light);
      doc.text(`LinkedIn: linkedin.com/in/jhulianramirez`, margin, footerY);
      
      const date = new Date().toLocaleDateString(i18n.language === 'es' ? 'es-CO' : 'en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      doc.text(date, pageWidth - margin, footerY, { align: 'right' });

      // Metadata
      doc.setProperties({
        title: `${name} - Resume`,
        subject: 'Resume / CV',
        author: name,
        keywords: 'software, architect, developer, cv, resume, .NET, Angular, Azure',
        creator: 'Jhulian Resume App'
      });

      // Save
      const fileName = `${name.replace(/\s+/g, '_')}_CV.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      className={styles.exportButton}
      onClick={handleExportPDF}
      disabled={isExporting}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <span className={styles.icon}>
        {isExporting ? '...' : 'PDF'}
      </span>
      <span className={styles.text}>
        {isExporting ? t('exporting') : t('exportPDF')}
      </span>
    </motion.button>
  );
};
