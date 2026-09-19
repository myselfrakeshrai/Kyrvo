import { useEffect, useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import KyContentSection from 'src/components/KyContentSection';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import './index.css';
import { PhotoAlbumService } from 'src/services/photoAlbumService';
import { useQuery } from '@tanstack/react-query';
import { SectionHeader } from 'src/components';
import { getImageUrl } from 'src/utils/helpers';
import { PhotoAlbum as PH } from 'src/models/PhotoAlbum';
import { Box } from '@mui/material';
interface PhotoAlbumWithImages {
  album: PH;
  imagesArray: { src: string; width: number; height: number }[];
}
const MediaPage = () => {
  const [open, setOpen] = useState(false);
  const [auto, setAuto] = useState(false);
  const [albumsWithArrays, setAlbumsWithArrays] = useState<
    PhotoAlbumWithImages[]
  >([]);

  const { isLoading: albumLoading, data: photoAlbums } = useQuery({
    queryKey: ['events'],
    queryFn: () => PhotoAlbumService.getAll().then((res) => res),
  });
  const loadImages = async (album: any) => {
    const imageUrls = album.Images.split('|').map((image: string) =>
      getImageUrl(image),
    );

    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () =>
          resolve({ src: img.src, width: img.width, height: img.height });
        img.onerror = (error) => reject(error);
      });
    };

    const imagesArray = await Promise.all(
      imageUrls.map((src: string) => loadImage(src)),
    );
    return { album, imagesArray };
  };
  const loadAlbums = async (albums: PH[] | undefined) => {
    if (albums) {
      albums?.map(async (albums) => {
        const ai = await loadImages(albums);
        albumsWithArrays.push(ai);
        setAlbumsWithArrays([...albumsWithArrays]);
      });
    }
  };
  useEffect(() => {
    loadAlbums(photoAlbums);
  }, [photoAlbums]);

  if (albumLoading) {
    return;
  }
  return (
    <KyContentSection py={5}>
      {albumsWithArrays &&
        albumsWithArrays.map((photo, index) => (
          <Box mb={10} key={`photoalbum-${index}`}>
            <SectionHeader title={photo.album.Name} alignment="center" />
            <p>{photo.album.Description}</p>
            <PhotoAlbum
              photos={photo.imagesArray}
              layout="masonry"
              targetRowHeight={150}
              onClick={() => {
                setAuto(true);
                setOpen(true);
              }}
            />
            <Lightbox
              open={open}
              fullscreen={{ auto }}
              close={() => setOpen(false)}
              slides={photo.imagesArray}
              plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
          </Box>
        ))}
    </KyContentSection>
  );
};

export default MediaPage;
