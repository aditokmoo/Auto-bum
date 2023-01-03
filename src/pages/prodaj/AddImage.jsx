import { useContext, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import AppContext from '../../context/AppContext';

export const AddImage = () => {
	const { carFormData, handleImageDelete, handleImageChange } = useContext(AppContext);
	const imageRef = useRef();

	return (
		<div className="image-section">
			<h2>Dodaj slike</h2>
			<div className="add-image-section">
				<label htmlFor="images">
					<span>
						<FiPlus id="icon" />
					</span>
					<span>Dodaj sliku</span>
				</label>
				<input type="file" id="images" onChange={handleImageChange} name='file'/>
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
	);
};
