import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../redux/hooks";

const StyledProfilePage = styled(Container)`
    margin-top: 30px;
    display: flex;
    gap: 50px;

    .user-img {
        width: 200px;
        height: 200px;

        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
`;

const ProfilePage = () => {
    const authState = useAppSelector((state) => state.auth);
    
  return (
    <StyledProfilePage>
        <Box className="user-img">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </Box>
        <Typography variant="h6">{authState.user?.name}</Typography>
    </StyledProfilePage>
  )
}

export default ProfilePage;