import { createStyles, makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import uniqby from 'lodash.uniqby';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyImage } from 'react-lazy-images';
import { Observable } from 'rxjs';
import { Hit } from '../model';
import apiService from '../service/api.service';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '&::after': {
        content: '',
        flexGrow: 99999999999,
      },
    },
  })
);

function useObservable<T>(observable: Observable<T>): T {
  const [state, setState] = useState(null);

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
}

export function Gallery(): JSX.Element {
  const [data, setData] = useState<Hit[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const styles = useStyles();
  const query = useObservable(apiService.queryObs);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    setPage(1);
    setData([]);
  }, [query]);

  useEffect(() => {
    if (query === null) {
      return;
    }

    const sub$$ = apiService.getImages(query, page).subscribe((res) => {
      const { hits, total } = res;
      const uniqueData = uniqby([...data, ...hits], 'id');

      setData(uniqueData);
      setHasMore(total > data.length);
    });

    return () => sub$$.unsubscribe();
  }, [query, page]);

  return (
    <InfiniteScroll
      next={() => {
        setPage(page + 1);
      }}
      hasMore={hasMore}
      loader={
        <CircularProgress
          className="fixed bottom-0 py-4"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />
      }
      dataLength={data.length}
      className={'flex flex-wrap px-16 bg-blue-200 pt-2' + styles.root}
    >
      {data.map((item, index) => {
        const width = (item.imageWidth * 200) / item.imageHeight;
        const padding = (item.imageHeight / item.imageWidth) * 100 + '%';
        const key = item.id + item.user;

        return (
          <div
            className="relative m-1 bg-gray-400"
            style={{ width, flexGrow: width }}
            key={key}
            ref={ref}
          >
            <i style={{ paddingBottom: padding }}></i>
            <LazyImage
              src={item.largeImageURL}
              placeholder={({ imageProps, ref }) => (
                <img ref={ref} src="#" alt={imageProps.alt} />
              )}
              actual={({ imageProps }) => (
                <>
                  <img
                    src={item.largeImageURL}
                    {...imageProps}
                    alt={imageProps.alt}
                  />
                  <ImageInfo hit={item} />
                </>
              )}
            />
          </div>
        );
      })}
    </InfiniteScroll>
  );
}

interface ImageInfoProps {
  hit: Hit;
}

function ImageInfo({ hit }: ImageInfoProps) {
  return (
    <div
      className="absolute bottom-0 flex flex-wrap justify-between text-gray-300 p-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out w-full"
      style={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}
    >
      <div className="flex items-center gap-1">
        <img
          src={hit.userImageURL}
          className="rounded-2xl h-8"
          alt={hit.tags}
        />
        <i className="whitespace-no-wrap">{hit.user}</i>
      </div>
      <div className="flex items-center text-xs gap-1">
        <StatisticIcon total={hit.likes}>
          <FavoriteBorderIcon />
        </StatisticIcon>
        <StatisticIcon total={hit.views}>
          <VisibilityOutlinedIcon />
        </StatisticIcon>
      </div>
    </div>
  );
}

type StatisticIconProps = React.PropsWithChildren<{ total: number }>;

function StatisticIcon({ total, children }: StatisticIconProps) {
  return (
    <div className="flex justify-center">
      {children}
      <span style={{ transform: 'translate(-2px, 1em)' }}>{total}</span>
    </div>
  );
}

export default Gallery;
