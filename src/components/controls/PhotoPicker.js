import { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch } from 'react-redux';
import { createClient } from 'pexels';
import { updateBackground } from '../../redux/layer/layerActions';

const apiKey = process.env.REACT_APP_PEXELS_API;
const client = createClient(apiKey);

const modes = ['categories', 'url'];

const PhotoPicker = ({ closeBrowser }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [mode, setMode] = useState('categories');
  const [error, setError] = useState(null);

  const imagesRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch(null);

  useEffect(() => {
    setPage(0);
  }, [category]);

  useEffect(() => {
    setQuery('');
    setError(null);
  }, [mode]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const extractId = (url) => {
    // Check if url is pexels url
    const check = new RegExp('https://www.pexels.com/photo', 'g');
    const count = url.match(check);

    // If only url occured once
    if(count && count.length === 1) {
      const cutPrefix = url.replace(check, '').replace(/[\/|\\]/g, '').split('-');
      return cutPrefix[cutPrefix.length - 1];
    }

    // Invalid url
    return false;
  };

  const getImage = async (query, page) => {
    if(!query) {
      return;
    }

    // If url mode
    const id = extractId(query);

    if(!id && mode === 'url') {
      setError('Invalid Url');
      return;
    }

    try {
      let response;
      switch (mode) {
        case 'url':
          response = await client.photos.show({ id });
          break;
        default:
          response = await client.photos.search({ query, per_page: 50, page });
          break;
      }

      if(page === 1) {
        if(mode !== 'url') {
          setPhotos(response.photos);
        }else{
          setPhotos([response]);
        }
      }else{
        const previousPhotos = photos;
        const newPhotos = previousPhotos.concat(response.photos);
        setPhotos(newPhotos);
      }
      setTotalResults(response.total_results);
      setPage(page + 1);
      setError(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    imagesRef.current.scrollTo(0, 0);

    getImage(query, 1);
    if(mode === 'categories') {
      setCategory(query);
    }else{
      setCategory('');
    }
  };

  const loadMore = (e) => {
    if(page >= 1) {
      getImage(query, page);
    }
  };

  const changeBackground = (id) => {
    dispatch(updateBackground('photo', 'imageID', id));
  };

  const changeMode = (m) => {
    setMode(m);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full px-5">
        <button
          className=" py-1 px-5 mb-3 font-bold text-white text-sm bg-purple-500 rounded-lg"
          onClick={closeBrowser}
        >Back
        </button>
        <div className="w-full flex flex-wrap mb-3 mt-2">
          {
            modes && modes.map((item) => {
              const isActive = item === mode;
              const bg = isActive ? 'bg-purple-500 ' : 'bg-menu';

              return (
                <button
                  key={`${item}-mode`}
                  className={`${bg} text-sm text-white mr-2 mb-2 py-1 px-2 rounded-lg focus:outline-none`}
                  onClick={() => changeMode(item)}
                >
                  {item}
                </button>
              );
            })
          }
        </div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="w-full mb-3 px-3 py-2 text-lg text-black focus:outline-none"
            type="text"
            onChange={handleChange}
            value={query}
            placeholder={mode === 'categories' ? 'ex: nature' : 'paste photo url from pexels.com'}
          />
        </form>
      </div>

      <div
        ref={imagesRef}
        className="custom-scrollbar overflow-y-auto w-full px-5"
      >
        {
          photos && photos.map((item) => {
            return (
              <div
                key={item.id}
                className="cursor-pointer mb-2 w-[306px] "
                role="link"
                onClick={() => changeBackground(item.id)}
              >
                <LazyLoadImage
                  src={item.src.large}
                  effect="blur"
                  height={(item.height / item.width) * 306}
                />
              </div>
            );
          })
        }

        {
          error && (
            <h1 className="text-white">{error}</h1>
          )
        }

        {
          photos.length > 0 && photos.length < totalResults && (
          <div className="flex w-full justify-center mt-5">
            <button
              onClick={loadMore}
              className="bg-purple-600 px-2 py-1 text-white rounded-lg mb-5"
            >Load more
            </button>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default PhotoPicker;
