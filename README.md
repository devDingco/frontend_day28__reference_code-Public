# frontend_day28__reference_code-Public
1. 공통
    - [ ]  완성된 day27 폴더를 활용하여 day28을 완성해 주세요.
2. 게시글목록
    - [ ]  게시글목록컴포넌트가 게시글목록, 배너 2개의 컴포넌트로 분리될 예정입니다.
    따라서, 게시글목록컴포넌트 하위에 2개의 컴포넌트를 추가로 만들어 주세요.
        - 게시글목록: src/components/boards-list/list
        - 배너: src/components/boards-list/banner
    - [ ]  기존에 존재하였던 게시글목록컴포넌트의 파일들(hook, index, queries, styles, types)을
    src/components/boards-list/list 경로로 이동시켜 주세요.
        - src/components/boards-list/hook.ts => src/components/boards-list/list/hook.ts
        - src/components/boards-list/index.tsx => src/components/boards-list/list/index.tsx
        - src/components/boards-list/queries.ts => src/components/boards-list/list/queries.ts
        - src/components/boards-list/styles.module.css => src/components/boards-list/list/styles.module.css
        - src/components/boards-list/types.ts => src/components/boards-list/list/types.ts
3. 게시글목록[배너]
    - [ ]  src/components/boards-list/banner/index.tsx 경로에 이미지의 배너 부분을 완성해 주세요.(아래 이미지 참고)
    - [ ]  캐러셀 라이브러리를 사용하여 여러 사진이 슬라이드 되도록 해당 배너를 완성해 주세요.
    => 라이브러리의 제한은 없습니다.(swiper, react-slick 추천)
4. 게시글목록[최종조립]
    - [ ]  게시글목록페이지 src/app/boards/page.tsx 경로의 파일을 수정합니다.
    => 해당 페이지에 위에서 만든 2개의 컴포넌트(배너, 게시글목록)를 불러와서 조립합니다.
5. 게시글상세
    - [ ]  src/app/boards/[boardId]/page.tsx 경로의 게시글상세와 관련된 페이지 및 컴포넌트의 좋아요, 싫어요 아이콘을 수정해 보세요.
        - [ ]  기존에 이미지로 연결하였던 좋아요, 싫어요 이미지를 UI라이브러리(또는 UI프레임워크)를 사용하여 아이콘으로 변경해 주세요.
        =>라이브러리의 제한은 없습니다.(MUI, ant-design 추천)
        => 디자인의 제한은 없습니다. 내가 좋아하는 아이콘으로 변경해 주세요.
6. 게시글상세[댓글등록]
    - [ ]  src/components/boards-detail/comment-write/index.tsx 경로에 댓글등록 부분을 보완해 주세요.
        - [ ]  댓글 등록시, 라이브러리를 사용하여 별점기능을 추가해 주세요.
        => 라이브러리의 제한은 없습니다.(MUI, ant-design 추천)
7. 게시글상세[댓글목록조회]
    - [ ]  src/components/boards-detail/comment-list/index.tsx 경로에 댓글목록조회 부분을 보완해 주세요.
        - [ ]  댓글 조회시, 라이브러리를 사용하여 별점을 보여주세요.
        => 라이브러리의 제한은 없습니다.(MUI, ant-design 추천)
