import { ChangeEvent, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "commons/graphql/graphql";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();

  const editId = isEdit ? params.boardId.toString() : "";

  //그래프큐엘 셋팅
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: editId.toString() },
    skip: !isEdit,
  });

  // 작성자 변경 불가
  const [name, setName] = useState("");
  // 비밀번호 수정 불가
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState(isEdit ? data?.fetchBoard.title : "");
  const [content, setContent] = useState(
    isEdit ? data?.fetchBoard.contents : ""
  );
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !name || !password || !title || !content;

  // 변경값 상태관리
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (isEdit === false) {
      let hasError = false;

      if (name.trim() === "") {
        setNameError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setNameError("");
      }

      if (password.length === 0) {
        setPasswordError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (!title?.trim()) {
        setTitleError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setTitleError("");
      }

      if (!content?.trim()) {
        setContentError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setContentError("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: content,
              youtubeUrl: "",
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
              images: ["", ""],
            },
          },
        });

        console.log("data", data);
        alert("게시글이 등록되었습니다!");
        // 해당글의 상세페이지로 이동하기
        router.push(`/boards/${data?.createBoard._id}`);
      }
    }

    // 기존의 글을 수정하는 경우
    else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (content?.trim() === "" && title?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        setTitleError("필수입력 사항입니다.");
        return;
      }
      if (content?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        return;
      }
      if (title?.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기

      const 입력받은비밀번호 = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );
      const updateInput: any = {};
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        updateInput.title = title;
      }

      if (content?.trim() && content !== data?.fetchBoard?.contents) {
        updateInput.contents = content;
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: editId,
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            alert("게시글이 성공적으로 수정되었습니다!");
          } else {
            alert("수정에 실패했습니다.");
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`);
        } catch (error: any) {
          // 에러 발생 시 처리
          const errMsg = (error as ApolloError).graphQLErrors[0] as any;
          if (errMsg) {
            alert(errMsg.message);
          } else {
            console.error("네트워크에러 발생");
          }
        }
      } else {
        alert("수정된 내용이 없습니다.");
      }
    }
  };
  return {
    name,
    data,
    nameError,
    password,
    passwordError,
    title,
    titleError,
    content,
    contentError,
    isButtonDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
  };
};
