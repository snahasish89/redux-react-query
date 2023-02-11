import React, { FC, memo, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks'
import { Loading } from '../component/Loading';
import { getGalleryAction, selectorCurrentImage, selectorImages, selectorImgStatus, updateCuttentImage } from '../slice/gallery.slice';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const imgs = useSelector(selectorImages);
  const imgStatus = useSelector(selectorImgStatus);
  const currentImg = useSelector(selectorCurrentImage);

  useMemo(() => {
    dispatch(getGalleryAction())
  },[])

  if(imgStatus === 'loading') return <Loading/>
  
  
  return (
    <section className='container mx-auto py-5 flex justify-between gap-2 rounded'>
      <div className='grid grid-cols-10 gap-3 pr-9'>
        {
          imgs.map((e) => (
            <div className='cursor-pointer' key={e.id} onClick={() => dispatch(updateCuttentImage(e.id))}>
              <Image url= {e.url} />
            </div>
          ))
        }
      </div>
      <div className='bg-slate-50 rounded-lg p-20'>
          <img src={currentImg?.url} alt="show current img" />
          <h4 className='text-center text-3xl mt-3'>{currentImg?.title}</h4>
      </div>
    </section>
  )
}

const Image: FC<{url: string,alt?: string}> = ({url,alt}) => {
    return (
        <img height={150} width={150} className="rounded" src={url} alt={alt} loading='lazy' />
    )
}

export default memo(Gallery)