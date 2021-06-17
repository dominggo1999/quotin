const ResizeHandler = ({ side }) => {
  return (
    <div
      style={{
        width: '30px',
        height: '100%',
        position: 'relative',
        left: side === 'left' ? '-23px' : '3px',
      }}
      role="region"
    >
      <div
        style={{
          background: '#00D9E1',
          borderTopLeftRadius: side === 'left' ? '4px' : null,
          borderBottomLeftRadius: side === 'left' ? '4px' : null,
          borderTopRightRadius: side === 'right' ? '4px' : null,
          borderBottomRightRadius: side === 'right' ? '4px' : null,
          height: '80%',
          width: '8px',
          padding: 0,
          right: side === 'left' ? 0 : null,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
      </div>
    </div>
  );
};

export default ResizeHandler;
