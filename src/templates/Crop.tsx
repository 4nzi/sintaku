import styled from 'styled-components'
import { useState, useCallback, useRef, useEffect } from 'react'
import Modal from 'react-modal'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '../components/index'
import { resetOpenCrop, selectOpenCropt } from '../RTK/uiSlice'
import { useSelector, useDispatch } from 'react-redux'

/* --------------------- Style --------------------- */
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  border-bottom: 1px solid #333;
  padding: 15px 15px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  > h2 {
    font-size: 1.8rem;
  }
`
const Main = styled.div`
  max-width: 100%;
  height: auto;
`
const Footer = styled.div`
  padding: 15px 15px;
`
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 3,
  },
  content: {
    maxWidth: '600px',
    height: 'auto',
    margin: '30px auto',
    bottom: 'auto',
    backgroundColor: '#222',
    border: 'none',
    padding: 'none',
    transform: 'translate(0, 0)',
    maxHeight: 'calc(100vh - 100px)',
  },
}
/* ------------------------------------------------- */

const Crop = ({ setCropThum, previewThum, setThum }) => {
  Modal.setAppElement('#__next')
  const dispatch = useDispatch()
  const openCrop = useSelector(selectOpenCropt)

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
  }, [completedCrop])

  const submitHandler = (canvas) => {
    if (!crop || !canvas) {
      return
    }
    canvas.toBlob((blob) => {
      const myFile = new File([blob], 'image.jpeg', {
        type: blob.type,
      })
      setThum(myFile)
      console.log(myFile)

      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = () => {
        setCropThum(reader.result)
      }
    })
    dispatch(resetOpenCrop())
  }

  return (
    <Modal isOpen={openCrop} style={modalStyle}>
      <Header>
        <h2>サムネイルを調整</h2>
        <Button type="button" onClick={() => dispatch(resetOpenCrop())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="22"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Header>
      <Main>
        <ReactCrop
          src={previewThum}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <canvas hidden ref={previewCanvasRef} />
      </Main>
      <Footer>
        <Button
          type="button"
          sType="color"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => submitHandler(previewCanvasRef.current)}
        >
          適応する
        </Button>
      </Footer>
    </Modal>
  )
}
export default Crop
