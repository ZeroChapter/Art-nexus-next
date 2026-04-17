interface DotProps {
    fill?: string;
    onClick?: () => void; 
}

const DotIcon = ({ fill = "#CCCCCC", onClick }: DotProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="6"
    viewBox="0 0 6 6"
    style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle',
        cursor: 'pointer', 
        transition: 'fill 0.2s ease' 
    }} 
    onClick={onClick} 
  >
    <circle cx="3" cy="3" r="3" fill={fill} />
  </svg>
);

export default DotIcon;