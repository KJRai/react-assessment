import "./App.css";
import { Album, Photo } from "./components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function App() {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const {
    data: albums,
    isLoading: isAlbumsLoading,
    isError: isAlbumsError,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/albums`);
      return response.data;
    },
  });

  const {
    data: photos,
    isLoading: isPhotosLoading,
    isError: isPhotosError,
  } = useQuery({
    queryKey: ["photos", selectedAlbumId],
    queryFn: async () => {
      if (!selectedAlbumId) return [];
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/albums/${selectedAlbumId}/photos`
      );
      return response.data;
    },
    enabled: !!selectedAlbumId,
  });

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId((prevId) => (prevId === albumId ? null : albumId));
  };

  return (
    <div className="container">
      <div className="flex gap-4">
        
        <div>
          <h1 className="bg-cyan-500 pb-4 border-b-2 mb-4 sticky ">Albums</h1>
          <div className="flex flex-col gap-2 h-screen overflow-y-auto pr-2">
            {isAlbumsLoading ? (
              <p>Loading albums...</p>
            ) : isAlbumsError ? (
              <p>Error loading albums.</p>
            ) : (
              albums.map((album) => (
                <div key={album.id}>
                  <Album
                    title={album.title}
                    onClick={() => handleAlbumClick(album.id)}
                  />
                  {selectedAlbumId === album.id && (
                    <div className="photos-grid">
                      <h1 className="pb-4 border-b-2 mb-4">Photos</h1>
                      <div className="grid-container">
                        {isPhotosLoading ? (
                          <p className="flex justify-center items-center"><MoonLoader 
                              size={60} 
                              color="#3b82f6" 
                              loading={isPhotosLoading}/></p>
                        ) : isPhotosError ? (
                          <p>Error loading photos.</p>
                        ) : photos && photos.length > 0 ? (
                          photos.map((photo) => (
                            <Photo
                              key={photo.id}
                              url={photo.thumbnailUrl} 
                              title={photo.title}
                            />
                          ))
                        ) : (
                          <p className="col-span-4 text-gray-500">
                            {selectedAlbumId
                              ? "No photos found in this album."
                              : "Click on an album to start viewing photos."}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;