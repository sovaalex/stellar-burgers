import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeed } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state) => state.feed.feed?.orders || []
  );
  const feedLoading = useSelector((state) => state.feed.loading);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <>
      {feedLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />
      )}
    </>
  );
};
