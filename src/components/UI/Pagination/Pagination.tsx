import React, { useEffect } from "react";
import { Pagination as PaginationAntd } from "antd";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./Pagination.scss";

export default function Pagination(props: any) {
  const { courses, location, history, itemsPerPage, setItemsPerPage } = props;
  const currentPage = parseInt(courses.page);
  useScrollToTop(location);
  useEffect(() => {
    if (courses.page === 1 && courses.limit === 10) {
      history.push(location.pathname);
    } else {
      history.push(
        `${location.pathname}?limit=${courses.limit}&page=${courses.page}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);
  const onChangePage = (newPage: number) => {
    history.push(`${location.pathname}?limit=${courses.limit}&page=${newPage}`);
  };
  const onShowSizeChange = (current: any, pageSize: any) => {
    history.push(`${location.pathname}?limit=${pageSize}&page=${current}`);
    setItemsPerPage(pageSize);
  };
  return (
    <PaginationAntd
      responsive
      defaultCurrent={currentPage}
      current={currentPage}
      total={courses.totalDocs}
      pageSize={itemsPerPage}
      pageSizeOptions={["10", courses.totalDocs]}
      onShowSizeChange={onShowSizeChange}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
}
