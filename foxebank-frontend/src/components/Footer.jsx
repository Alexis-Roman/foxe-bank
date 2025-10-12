import React from 'react';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#340C04', color: 'white' }}>
            <span>&copy; {new Date().getFullYear()} FOXe-Bank. All rights reserved.</span>
        </footer>
    );
}

export default Footer;