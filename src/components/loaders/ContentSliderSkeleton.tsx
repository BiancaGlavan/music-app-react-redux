import { styled } from "@mui/material/styles";
import { useTheme, useMediaQuery, Box, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";


const StyledContentSliderSkeleton = styled("div")`
    margin: 10px;
    margin-top: 20px;
    margin-bottom: 30px;


  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 25px;

    .buttons {
      display: flex;
      gap: 20px;
    }
  }



  .img-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 10px;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const ContentSliderSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledContentSliderSkeleton className="ContentSlider">
      <Box className="header">
        <Skeleton className="title" variant="rectangular" width={120} height={25} />
        {!isMobile && (
          <Box className="buttons">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Swiper
        className="my-swiper swiper-container"
        spaceBetween={20}
        slidesPerView={2.2}
        breakpoints={{
          400: {
            slidesPerView: 3.2,
          },
          600: {
            slidesPerView: 4.2,
          },
          800: {
            slidesPerView: 4.2,
          },
          900: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
          1200: {
            slidesPerView: 5.2,
          },
        }}
      >
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
        <SwiperSlide className="swiper">
            <Box className="img-container">
              <Skeleton className="img" variant="rectangular" />
            </Box>
            <Box className="text-box">
              <Skeleton variant="text" />
            </Box>
        </SwiperSlide>
      </Swiper>
    </StyledContentSliderSkeleton>
  );
};

export default ContentSliderSkeleton;
