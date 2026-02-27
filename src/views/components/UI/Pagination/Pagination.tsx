import React, { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Pagination as PaginationAntd } from 'antd';
import useScrollToTop from 'hooks/useScrollToTop';
import './Pagination.scss';

function Pagination(props: any) {
  const { courses, itemsPerPage, setItemsPerPage } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = parseInt(courses.page);
  useScrollToTop();
  useEffect(() => {
    if (courses.page === 1 && courses.limit === 10) {
      navigate(location.pathname, { replace: true });
    } else {
      navigate(`${location.pathname}?limit=${courses.limit}&page=${courses.page}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);
  const onChangePage = useCallback(
    (newPage: number) => {
      navigate(`${location.pathname}?limit=${courses.limit}&page=${newPage}`);
    },
    [navigate, location.pathname, courses.limit]
  );
  const onShowSizeChange = useCallback(
    (current: any, pageSize: any) => {
      navigate(`${location.pathname}?limit=${pageSize}&page=${current}`);
      setItemsPerPage(pageSize);
    },
    [navigate, location.pathname, setItemsPerPage]
  );
  return (
    <PaginationAntd
      responsive
      defaultCurrent={currentPage}
      current={currentPage}
      total={courses.totalDocs}
      pageSize={itemsPerPage}
      pageSizeOptions={['10', courses.totalDocs]}
      onShowSizeChange={onShowSizeChange}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
}

export default memo(Pagination);
