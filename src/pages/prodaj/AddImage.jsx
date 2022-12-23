import { useContext, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import AppContext from '../../context/AppContext';

export const AddImage = () => {
    const { addImages, imgSrc, handleImageDelete } = useContext(AppContext);
    const imageRef = useRef();

    return (
        <div className="image-section">
            <h2>Dodaj slike</h2>
            <form>  
                <label htmlFor="fileInput">
                    <span><FiPlus id='icon' /></span>
                    <span>Dodaj sliku</span>
                </label>
                <input type="file" id='fileInput' accept='image/*' onChange={(e) => addImages(e)} />
                {imgSrc.map((src, index) => (
                    <div className="image" key={index}>
                        <img ref={imageRef} alt='car' src={src} id="addedImage" />
                        <p onClick={() => handleImageDelete(src)}><FaTimes /></p>
                    </div>
                ))}
            </form>
        </div>
    )
}