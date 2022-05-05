import { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch } from 'react-redux';
import { createClient } from 'pexels';
import short from 'short-uuid';
import { updateBackground } from '../../redux/layer/layerActions';

const apiKey = import.meta.env.VITE_APP_PEXELS_API;
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
  const isSubscribed = useRef(true);

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
    return () => isSubscribed.current = false;
  }, []);

  const extractId = (url) => {
    // Check if url is pexels url
    // eslint-disable-next-line prefer-regex-literals
    const pexelsUrlCheck = /^https:\/\/images\.pexels\.com\/photos\/\d+/g;
    const count = url.match(pexelsUrlCheck);

    if(count?.length !==1) return false;

    // Check if pexels url is image url
    const imageUrlCheck = /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;
    if (!imageUrlCheck.test(url)) return false;

    // Remove prefix
    const id = count[0].split("https://images.pexels.com/photos/")[1];
    if(id) return id;


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

      // Prevent setting state when component already unmounted
      if(isSubscribed){
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
      }

    } catch (error) {
      if(isSubscribed){
        setError("Error when retrieving images")
      }

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
            placeholder={mode === 'categories' ? 'ex: nature' : 'Paste image url from pexels.com'}
          />
        </form>
      </div>

      <div
        ref={imagesRef}
        className="custom-scrollbar overflow-y-auto w-full px-5 overflow-x-hidden"
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
          <div className="flex flex-col w-full justify-center my-5">
            <a 
              target="_blank"
              rel="noreferer noopener"
              href={`https://www.pexels.com/search/${category}/`}
              role="link"
              className="self-center bg-purple-600 px-3 py-2 text-white rounded-lg"
            >
              Find More on Pexels
            </a>
            <p className="text-center text-white mt-1">You can paste Pexels url on url tab</p>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default PhotoPicker;
