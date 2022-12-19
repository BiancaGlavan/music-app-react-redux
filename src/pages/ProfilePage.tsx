import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../redux/hooks";
import EditIcon from '@mui/icons-material/Edit';

const StyledProfilePage = styled(Container)`
    .user-header {
    margin-top: 30px;
    display: flex;
    gap: 50px;
    align-items: center;

        .user-img {
            width: 150px;
            height: 150px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
                object-fit: cover;
            }
        }
    }

    .user-edit {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        max-width: 500px;

        .title {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn {
            max-width: 150px;
        }
    }
`;

const ProfilePage = () => {
  const authState = useAppSelector((state) => state.auth);

  return (
    <StyledProfilePage>
      <Box className="user-header">
        <Box className="user-img">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </Box>
        <Typography variant="h6">{authState.user?.name}</Typography>
      </Box>
      <Box className="user-edit">
        <Box className="title">
        <Typography variant="h6">Edit your profile</Typography>
        <EditIcon />
        </Box>
        <TextField id="outlined-basic" label="Username" type="text" variant="outlined" autoComplete="off" />
        <TextField id="outlined-basic" label="Password" type="password" variant="outlined" autoComplete="off"/>
        <Button className="btn" variant="contained">Update</Button>
      </Box>
    </StyledProfilePage>
  );
};

export default ProfilePage;
