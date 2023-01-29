import { useState } from 'react';
import { useContext, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
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
						<span>Galerija</span>
					</label>
					<label htmlFor="images-camera" id='imagesCamera'>
						<span>Kamera</span>
					</label>
					<span onClick={checkIsInfoActive}>Nastavi</span>
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
