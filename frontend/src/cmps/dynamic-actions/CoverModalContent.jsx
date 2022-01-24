import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { BsCheckLg } from "react-icons/bs";

// Actions
import { updateTask, onSaveBoard } from '../../store/board/board.action.js';

export function CoverModalContent({ board, group, task, toggleModal }) {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState({ header: 'Cover', type: 'cover' });
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const gColors = [
        // green
        '#61bd4f',
        //yellow
        '#f2d600',
        // orange
        '#ff9f1a',
        // red
        '#ed5a46',
        // pruple
        '#c377e0',
        // blue
        '#5BA4CF',
        // light blue
        '#00c2e0',
        // light green
        '#51e898',
        // pink
        '#ff78cb',
        // dark navy
        '#344563'
    ]

    const gImages = [
        { title: 'forest', url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { title: 'bird', url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' },
        { title: 'kayak', url: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' },
        { title: 'sunset', url: 'https://images.unsplash.com/photo-1422493757035-1e5e03968f95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1408&q=80' },
        { title: 'bonfire', url: 'https://images.unsplash.com/photo-1619537903549-0981d6bca911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { title: 'jerusalem', url: 'https://images.unsplash.com/photo-1593019612399-86daa4d18cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }
    ]

    useEffect(() => {
        if (task.style.backgroundImage.url) { 
            setSelectedImage(task.style.backgroundImage)
        }
        else setSelectedColor(task.style.backgroundColor)
    }, []);

    const getCoverBackground = () => {
        if (selectedImage?.url) {
            return `url(${selectedImage.url})`
        }
        return selectedColor
    }

    const getHalfCoverBackground = () => {
        if (selectedImage?.url) {
            const imageHalfCover = getImageColorByTitle(selectedImage.title)
            return imageHalfCover
        }
        return selectedColor
    }

    const getImageColorByTitle = (title) => { 
        switch (title) {
            case 'forest':
                return 'rgb(48 124 77)'
            case 'bird':
                return 'rgb(86 129 132)'
            case 'kayak':
                return 'rgb(147 117 97)'
            case 'sunset':
                return 'rgb(109 111 224)'
            case 'bonfire':
                return 'rgb(230 194 147)'
            case 'jerusalem':
                return 'rgb(15 93 167)'
            
            default: 
                return '#212427'
        }
    }

    const onSizeClick = (size) => { 
        let newTaskStyle;
        if(size === 'cover') { 
            setSelectedSize('cover')
            newTaskStyle = { ...task.style, isCover: true }
        }
        else {
            newTaskStyle = { ...task.style, isCover: false }
            setSelectedSize('uncover')
        }
        const taskToUpdate = { ...task, style: newTaskStyle }
        dispatch(updateTask(board._id, group.id, task.id, taskToUpdate));
    }

    const onColorClick = (color) => {
        setSelectedColor(color)
        setSelectedImage({ title: null, url: null })
        const newTaskStyle = { ...task.style, backgroundColor: color, backgroundImage: { title: null, url: null } }
        const taskToUpdate = { ...task, style: newTaskStyle }
        console.log('taskToUpdate - onColorClick', taskToUpdate);
        dispatch(updateTask(board._id, group.id, task.id, taskToUpdate));
    }

    const onImageClick = (image) => {
        setSelectedImage(image)
        setSelectedColor(null)
        const { title, url } = image
        const newTaskStyle = { ...task.style, backgroundImage: { title, url }, backgroundColor: null }
        const taskToUpdate = { ...task, style: newTaskStyle }
        console.log('taskToUpdate:', taskToUpdate);
        dispatch(updateTask(board._id, group.id, task.id, taskToUpdate));
    }

    return (
        <div className='cover-modal' >
            <section className='modal-header'>
                <button className='simple-close-btn' onClick={toggleModal}><GrClose className='btn-content' /></button>
                {modalType.header}
            </section>
            <section className='modal-content'>
                <section className='cover-modal-content'>
                    <section className='cover-size-section'>
                        <h4>Size</h4>
                        <div className='size-choice-container'>
                            <div className={`uncover-choice choice ${(selectedSize === 'cover') ? '' : 'selected'}`} choice onClick={() => { 
                                onSizeClick('uncover')
                            }}>
                                <div className='upper-background' style={{ background: `${getHalfCoverBackground()} center center / cover` }}>

                                </div>
                                <div className='lower-background'>

                                </div>
                            </div>
                            <div className={`cover-choice choice   ${(selectedSize === 'cover') ? 'selected' : ''}`} style={{ background: `${getCoverBackground()} center center / cover` }} onClick={() => {
                                onSizeClick('cover')
                            }}>

                            </div>
                        </div>
                        <button className='details-primary-link-btn wide-cover-btn'>Remove cover</button>
                    </section>
                    <section className='color-section'>
                        <h4>Colors</h4>
                        <section className='color-grid-container'>
                            {gColors.map(color => {
                                return <div key={color} style={{ backgroundColor: color }} className={`color-option ${(color === selectedColor) ? 'selected' : ''}`} onClick={() => {
                                    onColorClick(color)

                                }}>
                                    {/* {(color === selectedColor) ? <BsCheckLg className='checked-color-icon' /> : ''} */}
                                </div>
                            })}
                        </section>
                    </section>
                    <section className='attachment-section'>
                        <h4>Attachment</h4>
                        <button className='details-primary-link-btn wide-cover-btn'>Upload a cover image</button>
                    </section>
                    <section className='images-section'>
                        <h4>Photos from unsplash</h4>
                        <section className='images-grid-container'>
                            {gImages.map(image => {
                                return <div key={image.title} style={{ background: `url(${image.url}) center center / cover` }} className='image-option' onClick={() => {
                                    onImageClick(image)
                                }}>
                                </div>
                            })}
                        </section>
                        {/* <button className='details-primary-link-btn wide-cover-btn'>Upload a cover image</button> */}
                    </section>
                </section>
            </section>
        </div >

    );
}
