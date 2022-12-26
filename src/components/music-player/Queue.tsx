import { Box, Button, Drawer, IconButton, Paper, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CloseIcon from '@mui/icons-material/Close';
import QueueContent from "./QueueContent";

const StyledQueue = styled(Box)`

  display: flex;
  align-items: center;
  margin-left: 10px;

  .queue-btn {
    border: 1px solid ${(props) => props.theme.palette.secondary.main};
    color: ${(props) => props.theme.palette.secondary.main};

    &:hover {
      background: ${(props) => props.theme.palette.secondary.dark};
      color: #fff;
      border: 1px solid ${(props) => props.theme.palette.secondary.dark};
    }
  }

  ${props => props.theme.breakpoints.up("sm")} {
    margin-left: 20px;
  }

  .MuiDrawer-paper {
    background: red;
  }

  .close {
    display: flex;
    justify-content: flex-end;
  }

`;

const Queue = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (


    <StyledQueue>
      {isMobile ? <IconButton className="queue-btn" onClick={handleDrawerToggle}>
        <QueueMusicIcon />
      </IconButton> : <Button className="queue-btn" variant="outlined" onClick={handleDrawerToggle} startIcon={<QueueMusicIcon />}>
        Queue
      </Button>}
      {/* <Button variant="outlined" onClick={handleDrawerToggle} startIcon={<QueueMusicIcon />}>
        {!isMobile && 'Queue'}
      </Button> */}


      {/* <Drawer
        variant="temporary"
        anchor="bottom"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', height: 'calc(100vh - 90px)', marginBottom: {xs: '93px', sm: '90px'} },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <QueueContent />
      </Drawer> */}

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        swipeAreaWidth={5}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <QueueContent />
        </Box>

      </SwipeableDrawer>
    </StyledQueue>


  )
}

export default Queue;