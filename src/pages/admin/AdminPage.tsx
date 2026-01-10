// src/pages/admin/AdminPage.tsx
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  SearchRow,
  Input,
  Table,
  Th,
  Td,
  ActionBtn,
  Pagination,
} from "../../styles/admin/Admin.styles";
import {
  getUsersApi,
  activateUserApi,
  deactivateUserApi,
  getPlacesAdminApi,
  softDeletePlaceApi,
  hardDeletePlaceApi,
  getReviewsAdminApi,
  deleteReviewAdminApi,
  restorePlaceApi,
} from "../../api/admin.api";
import type { Category } from "../../types/category";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

interface AdminUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface AdminPlace {
  id: number;
  name: string;
  category: Category;
  address: string;
  deleted: boolean;
}

interface AdminReview {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  place: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
}

/* ================= COMPONENT ================= */

type TabType = "users" | "places" | "reviews";

export default function AdminPage() {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState<TabType>("users");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [places, setPlaces] = useState<AdminPlace[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const size = 10;

  const navigate = useNavigate();
  const location = useLocation();
  /* ================= TAB CHANGE ================= */

  const changeTab = (next: TabType) => {
    setTab(next);
    setKeyword("");
    setPage(0);
    setUsers([]);
    setPlaces([]);
    setReviews([]);
  };

  /* ================= USERS ================= */

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      alert("권한이 없습니다.");
    }
    if (tab !== "users") return;

    getUsersApi({
      page,
      size,
      ...(keyword.length >= 2 && { keyword }),
    }).then((res) => {
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [user, tab, page, keyword]);

  const toggleUserActive = async (user: AdminUser) => {
    if (user.active) {
      await deactivateUserApi(user.id);
    } else {
      await activateUserApi(user.id);
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u))
    );
  };

  /* ================= PLACES ================= */

  useEffect(() => {
    if (tab !== "places") return;

    getPlacesAdminApi({
      page,
      size,
      ...(keyword.length >= 2 && { keyword }),
    }).then((res) => {
      setPlaces(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [tab, page, keyword]);

  const togglePlaceDelete = async (place: AdminPlace) => {
    const isRestoring = place.deleted;

    const confirmed = window.confirm(
      isRestoring
        ? "플레이스를 다시 활성화하시겠습니까?"
        : "플레이스를 비활성화하시겠습니까?"
    );

    if (!confirmed) return;

    try {
      if (isRestoring) {
        await restorePlaceApi(place.id);
      } else {
        await softDeletePlaceApi(place.id);
      }

      setPlaces((prev) =>
        prev.map((p) =>
          p.id === place.id ? { ...p, deleted: !isRestoring } : p
        )
      );
    } catch (e) {
      alert(
        isRestoring
          ? "플레이스 활성화에 실패했습니다."
          : "플레이스 비활성화에 실패했습니다."
      );
    }
  };

  const hardDeletePlace = async (place: AdminPlace) => {
    const confirmed = window.confirm(
      "⚠ 이 작업은 되돌릴 수 없습니다.\n플레이스를 완전히 삭제하시겠습니까?"
    );
    if (!confirmed) return;

    const confirmedAgain = window.confirm("정말로 영구 삭제하시겠습니까?");
    if (!confirmedAgain) return;

    try {
      await hardDeletePlaceApi(place.id);

      // 리스트에서 제거
      setPlaces((prev) => prev.filter((p) => p.id !== place.id));
    } catch (e) {
      alert("플레이스 영구 삭제에 실패했습니다.");
    }
  };

  /* ================= REVIEWS ================= */

  useEffect(() => {
    if (tab !== "reviews") return;

    getReviewsAdminApi({
      page,
      size,
      ...(keyword.length >= 2 && { placeName: keyword }),
    }).then((res) => {
      setReviews(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [tab, page, keyword]);

  const deleteReview = async (id: number) => {
    const confirmed = window.confirm("리뷰를 삭제하시겠습니까?");
    if (!confirmed) return;

    await deleteReviewAdminApi(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Container>
      <Tabs>
        <Tab active={tab === "users"} onClick={() => changeTab("users")}>
          Users
        </Tab>
        <Tab active={tab === "places"} onClick={() => changeTab("places")}>
          Places
        </Tab>
        <Tab active={tab === "reviews"} onClick={() => changeTab("reviews")}>
          Reviews
        </Tab>
      </Tabs>

      <SearchRow>
        <Input
          placeholder={
            tab === "reviews"
              ? "플레이스 이름으로 검색 (2글자 이상)"
              : "이름 검색 (2글자 이상)"
          }
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </SearchRow>

      {/* ================= USERS TABLE ================= */}
      {tab === "users" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>이름</Th>
              <Th>Email</Th>
              <Th>상태</Th>
              <Th>액션</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <Td>{u.id}</Td>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>{u.active ? "ACTIVE" : "INACTIVE"}</Td>
                <Td>
                  <ActionBtn
                    danger={u.active}
                    onClick={() => toggleUserActive(u)}
                  >
                    {u.active ? "비활성화" : "활성화"}
                  </ActionBtn>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ================= PLACES TABLE ================= */}
      {tab === "places" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>이름</Th>
              <Th>카테고리</Th>
              <Th>주소</Th>
              <Th>상태</Th>
              <Th>액션</Th>
            </tr>
          </thead>
          <tbody>
            {places.map((p) => (
              <tr
                key={p.id}
                onClick={() =>
                  navigate(`/places/${p.id}`, {
                    state: { background: location },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <Td>{p.id}</Td>
                <Td>{p.name}</Td>
                <Td>{p.category}</Td>
                <Td>{p.address}</Td>
                <Td>{p.deleted ? "INACTIVE" : "ACTIVE"}</Td>
                <Td>
                  <ActionBtn
                    danger={!p.deleted}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlaceDelete(p);
                    }}
                  >
                    {p.deleted ? "복구" : "비활성화"}
                  </ActionBtn>
                  {/* Hard Delete (삭제된 상태에서만 노출) */}
                  {p.deleted && (
                    <ActionBtn
                      danger
                      style={{ marginLeft: 8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        hardDeletePlace(p);
                      }}
                    >
                      영구삭제
                    </ActionBtn>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ================= REVIEWS TABLE ================= */}
      {tab === "reviews" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Place</Th>
              <Th>User</Th>
              <Th>Rating</Th>
              <Th>작성일</Th>
              <Th>액션</Th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr
                key={r.id}
                onClick={() =>
                  navigate(`/reviews/${r.id}`, {
                    state: { background: location },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <Td>{r.id}</Td>
                <Td>{r.place.name}</Td>
                <Td>{r.user.name}</Td>
                <Td>{r.rating}</Td>
                <Td>{r.createdAt.slice(0, 10)}</Td>
                <Td>
                  <ActionBtn
                    danger
                    onClick={(e) => {
                      e.stopPropagation(); // Drawer 열림 방지
                      deleteReview(r.id);
                    }}
                  >
                    삭제
                  </ActionBtn>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ================= PAGINATION ================= */}
      <Pagination>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          ◀
        </button>
        <span>{page + 1}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          ▶
        </button>
      </Pagination>
    </Container>
  );
}
