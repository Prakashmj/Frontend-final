import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [active, setActive] = useState(() => {
    if (currentPath === '/home') return 'home';
    if (currentPath === '/friends') return 'friends';
    if (currentPath === '/upgrade') return 'upgrade';
    if (currentPath === '/earn') return 'earn';
    if (currentPath === '/stats') return 'stats';
    return '';
  });

  // Update active state when the route changes
  useEffect(() => {
    if (currentPath === '/home') setActive('home');
    if (currentPath === '/friends') setActive('friends');
    if (currentPath === '/upgrade') setActive('upgrade');
    if (currentPath === '/earn') setActive('earn');
    if (currentPath === '/stats') setActive('stats');
  }, [currentPath]);

  const handleClick = (icon) => {
    setActive(icon);
    router.push(`/${icon}`);
  };

  return (
    <footer style={footerStyle}>
      {/* First Icon Container: Friends and Upgrades */}
      <div style={iconGroupStyle}>
        <Link href="/friends" passHref>
          <div
            onClick={() => handleClick('friends')}
            style={{
              ...iconContainerStyle,
              border: active === 'friends' ? '2px solid orange' : 'none',
            }}
          >
            <img
              src={active === 'friends' ? '/friends2.svg' : '/friends.svg'}
              alt="Friends"
              style={iconStyle}
            />
            <p style={textStyle}>FRIENDS</p>
          </div>
        </Link>

        <Link href="/upgrade" passHref>
          <div
            onClick={() => handleClick('upgrade')}
            style={{
              ...iconContainerStyle,
              border: active === 'upgrade' ? '2px solid orange' : 'none',
            }}
          >
            <img
              src={active === 'upgrade' ? '/upgrade2.svg' : '/upgrade.svg'}
              alt="Upgrades"
              style={iconStyle}
            />
            <p style={textStyle}>UPGRADES</p>
          </div>
        </Link>
      </div>

      {/* Home Icon */}
      <Link href="/home" passHref>
        <div
          onClick={() => handleClick('home')}
          style={{
            ...homeContainerStyle,
          }}
        >
          <img
            src={active === 'home' ? '/home2.svg' : '/home1.svg'}
            alt="Home"
            style={homeIconStyle}
          />
        </div>
      </Link>

      {/* Second Icon Container: Earn and Stats */}
      <div style={iconGroupStyle}>
        <Link href="/earn" passHref>
          <div
            onClick={() => handleClick('earn')}
            style={{
              ...iconContainerStyle,
              border: active === 'earn' ? '2px solid orange' : 'none',
            }}
          >
            <img
              src={active === 'earn' ? '/earn2.svg' : '/earn.svg'}
              alt="Earn"
              style={iconStyle}
            />
            <p style={textStyle}>EARN</p>
          </div>
        </Link>

        <Link href="/stats" passHref>
          <div
            onClick={() => handleClick('stats')}
            style={{
              ...iconContainerStyle,
              border: active === 'stats' ? '2px solid orange' : 'none',
            }}
          >
            <img
              src={active === 'stats' ? '/stats2.svg' : '/stats.svg'}
              alt="Stats"
              style={iconStyle}
            />
            <p style={textStyle}>STATS</p>
          </div>
        </Link>
      </div>
    </footer>
  );
};

// Styling for footer and icons
const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#000',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  // height:'100%',
  borderTop: '1px solid orange',
  boxShadow: '0 0 5px #61440efc',
};

const iconGroupStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '55%',
};

const iconContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  width:'4rem'
};

const iconStyle = {
  width: '1.8rem', // Adjust size as needed
  height: '1.5rem',
  marginTop: '0.2rem',
  marginBottom:'0.3rem'
};

const textStyle = {
  color: 'white',
  fontSize: '0.7rem', // Reduced font size
  marginTop: '3px',
};

// Separate styling for the home icon
const homeContainerStyle = {
  borderRadius: '50%', // Rounded edges for a coin-like appearance
  cursor: 'pointer',
};

const homeIconStyle = {
  width: '5.2rem', // Size for the home icon
  height: '5.2rem',
};

export default Footer;