import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

const Video: React.FC<{ trailer_id?: string }> = ({ trailer_id }) => {
  const { id } = useParams();
  const navigation = useNavigate();

  return (
    <Modal handleClick={() => navigation('../')}>
      <div className='bg-secondary sm:w-75 sm:h-screen-90 rounded-lg overflow-hidden'>
        <iframe
          title='hello'
          width='100%'
          height='100%'
          frameBorder={0}
          src={`https://www.youtube.com/embed/${trailer_id ? trailer_id : id}`}
          allowFullScreen
          allow='autoplay;'
        />
      </div>
    </Modal>
  );
};

export default Video;
