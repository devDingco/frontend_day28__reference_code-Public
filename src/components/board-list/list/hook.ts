"use client";
import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "commons/graphql/graphql";
import { useRouter } from "next/navigation";

export const useBoardList = () => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState("");
  const { data } = useQuery(FetchBoardsDocument);

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    // 이벤트 버블링 방지
    event.stopPropagation();
    try {
      const response = await deleteBoard({
        variables: { boardId: hoveredId },
        // Todo - refetch ????
        refetchQueries: [{ query: FetchBoardsDocument }],
      });

      if (response.data) {
        alert("삭제가 완료 되었습니다");
      } else {
        alert("삭제가 실패하였습니다.");
      }
    } catch (err) {
      console.error("삭제실패");
    }
  };

  const onClickDetail = async (
    event: MouseEvent<HTMLButtonElement>,
    id: String
  ) => {
    event.stopPropagation();

    router.push(`/boards/${id}`);
  };

  return {
    hoveredId,
    setHoveredId,
    data,
    deleteBoard,
    onClickDelete,
    onClickDetail,
  };
};
