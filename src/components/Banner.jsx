import React from 'react'




function Banner({ bannerMovie }) {

  if (!bannerMovie) return null;

  return (
    <div
      className="h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`
      }}
    >
      <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">
        {bannerMovie.original_title}
      </div>
    </div>
  );
}


export default Banner;
 