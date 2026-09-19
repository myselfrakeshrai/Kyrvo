import { useNavigate } from 'react-router-dom';

export const useAppRoute = () => {
  const navigate = useNavigate();
  const goto = (path: string, searchParams?: string) =>
    navigate(`/manage/${path}` + (searchParams ? `?${searchParams}` : ''));
  const dtAction =
    (page: string, searchParams?: string) =>
    (actionType: string, id?: string | undefined) => {
      id
        ? navigate(
            `/manage/${page}/${actionType}/${id}` +
              (searchParams ? `?${searchParams}` : ''),
          )
        : navigate(
            `/manage/${page}/${actionType}` +
              (searchParams ? `?${searchParams}` : ''),
          );
    };
  return {
    dtAction,
    goto,
  };
};
