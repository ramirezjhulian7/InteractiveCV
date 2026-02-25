import React from 'react';
import { ChevronLeft } from 'lucide-react';

const MobileAppView = ({ appName, onBack, children }) => {
    return (
        <div className="mobile-app-view">
            <div className="mobile-app-navbar">
                <div className="mobile-app-back" onClick={onBack}>
                    <ChevronLeft size={22} /> <span>{appName}</span>
                </div>
            </div>
            <div className="mobile-app-content">
                {children}
            </div>
        </div>
    );
};

export default MobileAppView;
