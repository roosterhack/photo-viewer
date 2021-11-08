import styled from "styled-components";

interface CardProps {
  isLess?: boolean;
}

const Card = styled.div<CardProps>`
  cursor: pointer;
  transition: all 0.3s;
  max-width: ${(props) => (props.isLess ? "10%" : "50%")};
  margin: 10px;
  position: relative;
  // &:hover {
  //   transform: scale(1.1);
  //   transition: all 0.3s;
  // }
  img {
    max-width: 100%;
    z-index: 20;
  }
`;

const Remove = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background: red;
  position: absolute;
  top: -4px;
  right: 15px;
  z-index: 0;
  color: #fff;
`;

interface LikedCardProps {
  pic: string;
  handleRemove: (pic: string) => void;
  isLess?: boolean;
}

export const LikedCard = ({ pic, handleRemove, isLess }: LikedCardProps) => (
  <>
    <Card isLess={isLess} key={pic}>
      <img src={pic} alt="" />
      <Remove onClick={() => handleRemove(pic)}>X</Remove>
    </Card>
  </>
);
