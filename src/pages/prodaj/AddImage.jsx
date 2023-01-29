import { useContext, useRef } from 'react';
import { FaTimes, FaCamera } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { TfiGallery } from 'react-icons/tfi'
import AppContext from '../../context/AppContext';

export const AddImage = ({ checkIsInfoActive }) => {
	const { carFormData, handleImageDelete, handleImageChange } = useContext(AppContext);
	const imageRef = useRef();

	return (
		<div className='image-section'>
			<h2>Dodaj slike</h2>
			<div className="add-image-section">
				<label htmlFor="images-desktop" id='imagesDesktop'>
					<span>
						<FiPlus id="icon" />
					</span>
					<span>Dodaj sliku</span>
				</label>
				<div className="btns">
					<label htmlFor="images-mobile">
						<span id='gallery-span'><TfiGallery fontSize='20px' /> Galerija</span>
					</label>
					<label htmlFor="images-camera" id='imagesCamera'>
						<span><FaCamera fontSize='20px' /> Kamera</span>
					</label>
					<span onClick={checkIsInfoActive} id='continue-span'>Nastavi</span>
				</div>
				<input type="file" id="images-desktop" onChange={handleImageChange} name='file'/>
				<input type="file" id="images-mobile" onChange={handleImageChange} name='file'/>
				<input type="file" id="images-camera" onChange={handleImageChange} name='file'/>
				<div className="images">
					{carFormData.images && carFormData.images.map((src, index) => (
						<div className="image" key={index}>
							<img ref={imageRef} alt="car" src={src.image} id="addedImage" />
							<p onClick={() => handleImageDelete(src, index)}>
								<FaTimes />
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
