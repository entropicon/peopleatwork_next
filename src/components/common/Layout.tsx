import { Box } from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <> 
      <Navbar />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
