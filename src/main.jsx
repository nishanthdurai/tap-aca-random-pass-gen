/* eslint-disable no-undef */
// library
import { Typography, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Content from './content.jsx';

const Main = () => {
  return (
    <Box>
      {/* header */}
      <AppBar position='sticky'>
        <Toolbar>
          <Typography>Password Generator</Typography>
        </Toolbar>
      </AppBar>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        p={2}
      >
        <Content />
      </Box>
    </Box>
  );
};

export default Main;
