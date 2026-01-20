import { useRef, useState } from "react";
import {
  Overlay,
  Modal,
  Title,
  Section,
  LabelRow,
  PlusButton,
  Icon,
  PreviewImage,
  ButtonRow,
  Textarea,
  ThinDivider,
  ScrollArea,
} from "../../styles/review/ReviewWriteModal.styles";
import { RatingStarsInput } from "./RatingStartsInput";
import { updateReviewApi } from "../../api/review.api";
import { getPresignedUrlApi } from "../../api/s3.api";
import type { ReviewResponse } from "../../api/review.api";
import {
  CancelButton,
  EditButton,
} from "../../styles/review/ReviewDetailDrawer.styles";

export function ReviewEditModal({
  review,
  onClose,
  onSuccess,
}: {
  review: ReviewResponse;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  const [reviewImageFile, setReviewImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    review.reviewImageUrl ?? null
  );
  const [removeImage, setRemoveImage] = useState(false);

  const reviewInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    let reviewImageUrl: string | null | undefined = review.reviewImageUrl;

    // 새 이미지 업로드
    if (reviewImageFile) {
      const { uploadUrl, fileUrl } = await getPresignedUrlApi({
        folder: "review-images",
        originalFileName: reviewImageFile.name,
        contentType: reviewImageFile.type,
      });

      await fetch(uploadUrl, {
        method: "PUT",
        body: reviewImageFile,
        headers: { "Content-Type": reviewImageFile.type },
      });

      reviewImageUrl = fileUrl;
    }

    // 기존 이미지 삭제
    if (removeImage) {
      reviewImageUrl = null;
    }

    await updateReviewApi({
      reviewId: review.id,
      rating,
      content,
      reviewImageUrl,
      removeImage,
    });

    onSuccess();
  };

  return (
    <Overlay>
      <Modal>
        <ScrollArea>
          <Title style={{ marginBottom: "20px" }}>리뷰 수정</Title>

          <ThinDivider />
          <LabelRow>&lt;{review.place.name}&gt;</LabelRow>

          <LabelRow>평점</LabelRow>
          <RatingStarsInput rating={rating} onChange={setRating} />
          <LabelRow>내용</LabelRow>
          <Textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 리뷰 이미지 */}
          <Section>
            <LabelRow>
              리뷰 사진
              <PlusButton onClick={() => reviewInputRef.current?.click()}>
                {previewUrl ? (
                  <Icon className="material-symbols-outlined">restart_alt</Icon>
                ) : (
                  "+"
                )}
              </PlusButton>
            </LabelRow>

            <input
              ref={reviewInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setReviewImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                setRemoveImage(false);
              }}
            />

            {previewUrl && (
              <div style={{ position: "relative", width: "fit-content" }}>
                <PreviewImage src={previewUrl} />
                <button
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    border: "none",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setPreviewUrl(null);
                    setReviewImageFile(null);
                    setRemoveImage(true);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </Section>
        </ScrollArea>
        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <EditButton onClick={handleSubmit}>수정</EditButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
