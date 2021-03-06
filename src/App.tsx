import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useFetchRandomPhotoQuery } from "./features/photoApi/photoApi";
import "./App.css";
import { add, remove } from "./features/like/likeSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./settings";
import { LikedCard } from "./LikedCard";
import styled from "styled-components";

const Image = styled.div`
  max-width: 550px;
  height: auto;
  margin: 0 auto;
  margin-top: 80px;
  img {
    width: 100%;
    height: auto;
  }
`;

const CardWrapper = styled.div`
  display: flex;
`;

function App() {
  const dispatch = useAppDispatch();
  const liked = useAppSelector((state) => state.persistedReducer.liked);

  const [addPhoto, setAddPhoto] = useState(!liked);

  const { data, isLoading, error, isUninitialized, refetch } =
    useFetchRandomPhotoQuery(null, { skip: addPhoto });

  const handleLike = (url: string) => {
    dispatch(add(url));
    refetch();
  };

  const handleRemove = (url: string) => {
    dispatch(remove(url));
  };

  return (
    <div className="App">
      <nav>
        <h2>Image Approval app</h2>
      </nav>
      <div>
        <h2>Approved images</h2>

        {liked.length > 3 ? (
          // <Slider {...settings}>
          <CardWrapper>
            {liked.map((pic: string) => (
              <LikedCard
                pic={pic}
                handleRemove={handleRemove}
                key={pic}
                isLess
              />
            ))}
          </CardWrapper>
        ) : (
          // </Slider>
          <CardWrapper>
            {liked.map((pic: string) => (
              <LikedCard
                pic={pic}
                handleRemove={handleRemove}
                key={pic}
                isLess
              />
            ))}
          </CardWrapper>
        )}
      </div>
      {/* main */}
      <div>
        <div>
          {error ? (
            <>Soemthing went wrong mate.</>
          ) : isUninitialized ? (
            <div className="blank-image" onClick={(prev) => setAddPhoto(!prev)}>
              Add
            </div>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <Image>
              <img src={data.urls.regular} alt={data.urls.regular} />
            </Image>
          ) : null}
        </div>
        {/* control */}
        <div>
          <button onClick={() => refetch()}>No</button>
          <button onClick={() => handleLike(data.urls.regular)}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default App;
