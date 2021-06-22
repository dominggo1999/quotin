import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch } from 'react-redux';
import { createClient } from 'pexels';
import { updateBackground } from '../../redux/layer/layerActions';

const apiKey = process.env.REACT_APP_PEXELS_API;
const client = createClient(apiKey);

const PhotoPicker = ({ closeBrowser }) => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch(null);

  const getImage = async (query, page) => {
    try {
      const response = await client.photos.search({ query, per_page: 50, page });

      if(page === 1) {
        setPhotos(response.photos);
      }else{
        const previousPhotos = photos;
        const newPhotos = previousPhotos.concat(response.photos);
        setPhotos(newPhotos);
      }
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getImage(query, 1);
  };

  const loadMore = (e) => {
    if(page >= 1) {
      const nextPage = page + 1;
      getImage(query, nextPage);
    }
  };

  const changeBackground = (id) => {
    dispatch(updateBackground('photo', 'imageID', id));
  };

  return (
    <div className="no-scrollbar w-full h-full flex flex-col items-center">
      <div className="w-full px-5">
        <button
          className=" py-1 px-5 mb-3 font-bold text-white text-sm bg-purple-500 rounded-lg"
          onClick={closeBrowser}
        >Back
        </button>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-3 px-3 py-2 text-lg text-black focus:outline-none"
            type="text"
            onChange={handleChange}
            value={query}
          />
        </form>
      </div>

      <div className="flex flex-col items-center custom-scrollbar overflow-y-auto px-5">
        {
            photos && photos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="cursor-pointer mb-2 w-[306px]"
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
          photos.length > 0 && (
          <div className="flex w-full justify-center mt-5">
            <button
              onClick={loadMore}
              className="bg-purple-600 px-2 py-1 text-white rounded-lg"
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
