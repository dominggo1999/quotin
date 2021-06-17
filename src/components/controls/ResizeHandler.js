const ResizeHandler = ({ side }) => {
  return (
    <div
      style={{
        background: '#00D9E1',
        borderTopLeftRadius: side === 'left' ? '4px' : null,
        borderBottomLeftRadius: side === 'left' ? '4px' : null,
        borderTopRightRadius: side === 'right' ? '4px' : null,
        borderBottomRightRadius: side === 'right' ? '4px' : null,
        height: '80%',
        width: '80%',
        padding: 0,
        left: side === 'left' ? '-2px' : 4,
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >

    </div>
  );
};

export default ResizeHandler;
