import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Tutorial = () => {
    const { t, lang, setLang } = useLanguage();
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const seen = localStorage.getItem('mac_tutorial_seen');
        if (!seen) setShow(true);
    }, []);

    const dismiss = () => {
        localStorage.setItem('mac_tutorial_seen', 'true');
        setShow(false);
    };

    if (!show) return null;

    const steps = t('tutorialSteps');

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.4s ease',
        }}>
            <div style={{
                width: 500, maxWidth: '90vw', background: '#1c1c1e',
                borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
            }}>
                {/* Header */}
                <div style={{
                    padding: '32px 32px 20px', textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                }}>
                    <img src={`${import.meta.env.BASE_URL}profile.jpeg`} alt="Jhulian" style={{
                        width: 70, height: 70, borderRadius: '50%', objectFit: 'cover',
                        border: '3px solid rgba(255,255,255,0.2)', marginBottom: 12,
                    }} />
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{t('tutorialTitle')}</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>{t('tutorialSubtitle')}</div>
                </div>

                {/* Steps carousel */}
                <div style={{ padding: '20px 32px' }}>
                    {/* Dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
                        {steps.map((_, i) => (
                            <div key={i} onClick={() => setStep(i)} style={{
                                width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
                                background: i === step ? '#3b82f6' : 'rgba(255,255,255,0.15)',
                                transition: 'background 0.2s',
                            }} />
                        ))}
                    </div>

                    {/* Current step */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                        background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.06)', minHeight: 72,
                    }}>
                        <div style={{ fontSize: 36, flexShrink: 0 }}>{steps[step].icon}</div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{steps[step].title}</div>
                            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{steps[step].desc}</div>
                        </div>
                    </div>

                    {/* Nav arrows */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
                            padding: '6px 14px', borderRadius: 6, border: 'none', cursor: step > 0 ? 'pointer' : 'default',
                            background: step > 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                            color: step > 0 ? '#ccc' : '#444', fontSize: 13,
                        }}>← prev</button>
                        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} style={{
                            padding: '6px 14px', borderRadius: 6, border: 'none', cursor: step < steps.length - 1 ? 'pointer' : 'default',
                            background: step < steps.length - 1 ? 'rgba(255,255,255,0.08)' : 'transparent',
                            color: step < steps.length - 1 ? '#ccc' : '#444', fontSize: 13,
                        }}>next →</button>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '0 32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <button onClick={dismiss} style={{
                        width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(102,126,234,0.3)',
                    }}>{t('tutorialStart')}</button>
                    <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} style={{
                        background: 'none', border: 'none', color: '#3b82f6', fontSize: 12,
                        cursor: 'pointer', textDecoration: 'underline',
                    }}>{t('tutorialLang')}</button>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
