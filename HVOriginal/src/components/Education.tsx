import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  icon: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  icon: string;
  score?: string;
}

export const Education = () => {
  const { t } = useTranslation();
  const education = t('education', { returnObjects: true }) as EducationItem[];
  const certifications = t('certifications', { returnObjects: true }) as CertificationItem[];

  return (
    <section className={styles.education} id="education">
      <div className="container">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            <span className="gradient-text">{t('sections.education')}</span>
          </h2>
        </motion.div>

        <div className={styles.educationGrid}>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className={styles.educationCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className={styles.eduIcon}>{edu.icon}</span>
              <div className={styles.eduContent}>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <p className={styles.institution}>{edu.institution}</p>
                <p className={styles.period}>{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.certSection}
        >
          <h2 className={styles.title}>
            <span className="gradient-text">{t('sections.certifications')}</span>
          </h2>
        </motion.div>

        <div className={styles.certGrid}>
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className={styles.certCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <span className={styles.certIcon}>{cert.icon}</span>
              <div className={styles.certContent}>
                <h4 className={styles.certName}>{cert.name}</h4>
                <p className={styles.certIssuer}>{cert.issuer}</p>
                <p className={styles.certDate}>
                  {cert.date}
                  {cert.score && <span className={styles.score}> • {cert.score}</span>}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
