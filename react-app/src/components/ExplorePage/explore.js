import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getImagesThunk } from '../../store/image'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './explore.css';

const GetAllImages = () => {

    const allImages = useSelector(state => state.image);
    const allImagesArr = Object.values(allImages);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getImagesThunk())
    }, [dispatch])

    if (!allImagesArr.length) {
        return null
    }

    // Kevin was here

    return (
        <div id="explore-container">
            <div className='images-container'>
                <div className='images-wrapper'>
                    {allImagesArr.map((image) => (
                        <Link to={`/images/${image.id}`}>
                            <div key={image.id}>
                                <img className='single-img' src={image.previewImageUrl} alt=''></img>
                                <div className='hide'>
                                    {image.title}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default GetAllImages
