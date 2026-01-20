import { useRef, useState } from "react";
import {
  Overlay,
  Modal,
  Title,
  Section,
  LabelRow,
  PlusButton,
  Icon,
  CheckCircle,
  PreviewImage,
  Dropdown,
  DropdownItem,
  SearchInput,
  Textarea,
  ButtonRow,
  ScrollArea,
  ThinDivider,
} from "../../styles/review/ReviewWriteModal.styles";
import { RatingStarsInput } from "./RatingStartsInput";
import {
  createReviewApi,
  searchPlaceForReviewApi,
  type PlaceSearchResponse,
} from "../../api/review.api";
import { getPresignedUrlApi } from "../../api/s3.api";
import {
  CancelButton,
  EditButton,
} from "../../styles/review/ReviewDetailDrawer.styles";

export function ReviewWriteModal({ onClose, onSuccess }: any) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const receiptInputRef = useRef<HTMLInputElement>(null);
  const reviewInputRef = useRef<HTMLInputElement>(null);

  const [placeKeyword, setPlaceKeyword] = useState("");
  const [placeResults, setPlaceResults] = useState<PlaceSearchResponse[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<PlaceSearchResponse | null>(null);

  const handlePlaceSearch = async () => {
    if (placeKeyword.trim().length < 2) return;
    const res = await searchPlaceForReviewApi(placeKeyword);
    setPlaceResults(res);
  };

  const handleSubmit = async () => {
    if (!selectedPlace || !rating || !receiptFile) return;

    let reviewImageUrl: string | undefined;

    try {
      if (reviewImage) {
        const { uploadUrl, fileUrl } = await getPresignedUrlApi({
          folder: "review-images",
          originalFileName: reviewImage.name,
          contentType: reviewImage.type,
        });

        console.log("upload contentType", reviewImage.type);
        await fetch(uploadUrl, {
          method: "PUT",
          body: reviewImage,
          headers: { "Content-Type": reviewImage.type },
        });

        reviewImageUrl = fileUrl;
      }

      await createReviewApi({
        placeId: selectedPlace.id,
        rating,
        content,
        reviewImageUrl,
        receiptImage: receiptFile,
      });

      onSuccess?.();
      onClose();
    } catch (e) {
      alert("리뷰 작성에 실패하였습니다. 필수값은 반드시 입력해주세요." + e);
    }
  };

  return (
    <Overlay>
      <Modal>
        <ScrollArea>
          <Title>리뷰 작성</Title>
          <ThinDivider />

          {/* 장소 검색 */}
          <Section>
            <SearchInput
              placeholder="장소 검색"
              value={placeKeyword}
              onChange={(e) => setPlaceKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePlaceSearch()}
            />

            {placeResults.length > 0 && (
              <Dropdown>
                {placeResults.map((p) => (
                  <DropdownItem
                    key={p.id}
                    onClick={() => {
                      setSelectedPlace(p);
                      setPlaceKeyword(p.name);
                      setPlaceResults([]);
                    }}
                  >
                    <strong>{p.name}</strong>
                    <span
                      style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                      {p.roadAddress}
                    </span>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </Section>

          {/* 영수증 */}
          <Section>
            <LabelRow>
              영수증 (필수)
              {!receiptFile ? (
                <PlusButton onClick={() => receiptInputRef.current?.click()}>
                  +
                </PlusButton>
              ) : (
                <CheckCircle>
                  <span className="material-symbols-outlined">check</span>
                </CheckCircle>
              )}
            </LabelRow>

            <input
              ref={receiptInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
            />
          </Section>

          {/* 리뷰 사진 */}
          <Section>
            <LabelRow>
              리뷰 사진 (선택)
              <PlusButton onClick={() => reviewInputRef.current?.click()}>
                {reviewImage ? (
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
                setReviewImage(file);
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
                    setReviewImage(null);
                    setRemoveImage(true);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </Section>

          <LabelRow>평점 선택 (필수)</LabelRow>
          <RatingStarsInput rating={rating} onChange={setRating} />

          <LabelRow>내용</LabelRow>
          <Textarea
            rows={4}
            placeholder="평가를 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ScrollArea>
        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <EditButton
            disabled={!selectedPlace || !rating || !receiptFile}
            onClick={handleSubmit}
          >
            등록
          </EditButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
