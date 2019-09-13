import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
 desktop: '(min-width: 1025px)',
 phone: '(max-width: 1024px)',
};

export default function Breakpoint(props) {
 const breakpoint = breakpoints[props.name] || breakpoints.desktop;
return (
 <MediaQuery {...props } query={breakpoint}>
 {props.children}
 </MediaQuery>
 );
}
React.propTypes = {
 name: String,
 children: Object,
}
