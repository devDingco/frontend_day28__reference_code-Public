"use client";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardWrite } from "./hook";
import { IBoardWriteProps } from "./types";

const IMAGE_SRC = {
  addImage: {
    src: require("@assets/add_image.png"),
    alt: "사진추가이미지",
  },
};

export default function BoardWritePage(props: IBoardWriteProps) {
  const { isEdit } = props;

  const {
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
  } = useBoardWrite(isEdit);

  return (
    <div className={styles.layout}>
      <div className={styles.enroll_subject}>
        <div className={styles.enroll_subject_text}>
          {isEdit ? "게시물 수정" : "게시물 등록"}
        </div>
      </div>
      <div className={styles.enroll_row_container}>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_row_flex}>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>작성자 </div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={isEdit}
                defaultValue={
                  isEdit
                    ? data?.fetchBoard?.writer
                      ? data?.fetchBoard?.writer
                      : ""
                    : name
                }
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeName}
              />
              <div className={styles.error_msg}>{nameError}</div>
            </div>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={isEdit}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangePassword}
                defaultValue={isEdit ? "*********" : password}
              />
              <div className={styles.error_msg}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>제목</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <input
            defaultValue={isEdit ? data?.fetchBoard?.title : title}
            type="text"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.error_msg}>{titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            defaultValue={isEdit ? data?.fetchBoard?.contents : content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles.error_msg}>{contentError}</div>
        </div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>주소</div>
          </div>
          <div className={styles.enroll_address_firstrow}>
            <input
              type="number"
              className={styles.zipcode_input}
              placeholder="12345"
            />
            <button className={styles.zipcode_search_button}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles.enroll_input}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button}>취소</button>
        <button
          className={
            !isEdit && isButtonDisabled
              ? `${styles.enroll_submit_button} ${styles.disabled}`
              : styles.enroll_submit_button
          }
          onClick={onClickSignup}
          disabled={!isEdit && isButtonDisabled}
        >
          {isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
}
