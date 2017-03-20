import * as React from 'react';

import { AppStyles as Styles } from '../AppStyles';

        
export var GoFooter = (onClick: () => void, containerStyle?: any, spanStyle?: any) => {
    return (
        <div id="footer" style={typeof containerStyle === "undefined" ? Styles.Footer.inlineStyle : containerStyle}>
            <span style={typeof spanStyle === "undefined" ? Styles.Footer.spanStyle : spanStyle} onClick={() => { onClick(); }}>GO</span>
        </div>
    );
}