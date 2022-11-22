import styled from "styled-components";
import Review from "./Review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ReviewListContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 10px;
`;

export default function ReviewList() {
  const [ref, inView] = useInView();
  const { data } = useQuery(["reviews"], () => {
    return axios.get("https://koreanjson.com/posts");
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const lastPage = Math.ceil(data?.data.length / 10);

    if (page !== lastPage && inView) setPage(page + 1);
  }, [inView]);

  return (
    <>
      <ReviewListContainer>
        {data?.data.slice(0, page * 10).map((review) => {
          return <Review key={review.id} />;
        })}
        <div ref={ref}></div>
      </ReviewListContainer>
    </>
  );
}
