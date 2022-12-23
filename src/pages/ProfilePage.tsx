import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateProfileMutation, useUploadImageMutation } from "../redux/features/apiSlice";
import { useEffect, useState } from "react";

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

  const [image, setImage] = useState(authState.user?.image);
  const [name, setName] = useState(authState.user?.name);

  const [uploadImage, response] = useUploadImageMutation();
  const [updateProfile, updateResponse] = useUpdateProfileMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      uploadImage(formData);
    }
  };

  const handleProfileUpdate = () => {
    updateProfile({
      name: name,
      image: image,
    });
  };

  useEffect(() => {
    console.log("responseData: ", response.data);
    if (response.data) {
      setImage(response.data);
      console.log("responsedata: ", response.data);
    }
  }, [response]);

  return (
    <StyledProfilePage>
      <Box className="user-header">
        <Box className="user-img">
          <img src={image ? `https://different-fish-battledress.cyclic.app/api/images/${image}` : ''} alt="" />
        </Box>
        <Typography variant="h2">{authState.user?.name}</Typography>
      </Box>
      <Box className="user-edit">
        <Box className="title">
          <Typography variant="h2">Edit your profile</Typography>
          <EditIcon />
        </Box>
        <TextField onChange={handleFileChange} type="file" variant="outlined" />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Username"
          type="text"
          variant="outlined"
          autoComplete="off"
        />
        <TextField label="Password" type="password" variant="outlined" autoComplete="off" />
        <Button onClick={handleProfileUpdate} className="btn" variant="contained">
          Update
        </Button>
      </Box>
    </StyledProfilePage>
  );
};

export default ProfilePage;
