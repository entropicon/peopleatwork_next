import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100000,
    backgroundColor: 'var(--neutral-lightest)',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Box sx={style}>
      <CircularProgress
        color="primary"
        size="5rem"
      />
    </Box>
  );
};

export default Loading;
