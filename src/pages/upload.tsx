import styled from 'styled-components'
import { useAuthChecker } from '../hooks/useAuthChecker'
import { useState } from 'react'
import {
  Input,
  TextArea,
  PreviewThum,
  PreviewImage,
  Button,
  Frame,
} from '../components/index'
import { Layout, Crop } from '../templates/index'
import { useMutatePost } from '../hooks/useMutatePost'
import { useValidate } from '../hooks/useValidate'
import { sp, tab } from '../media'

/* --------------------- Style --------------------- */
const Container = styled.div`
  margin: 0 auto;
  max-width: 1300px;
  padding: 30px;
  ${sp`
    padding: 10px;
  `}
`
const Wrapper = styled.form`
  display: grid;
  gap: 25px;
  grid-template:
    'hed  hed'
    'tit  thu'
    'des  thu'
    'img  sub'
    /3fr 1fr;
  ${tab`
    grid-template:
      'hed'
      'tit'
      'des'
      'img'
      'thu'
      'sub';
  `}
`
const Header = styled.div`
  grid-area: hed;
  border-bottom: 1px solid #353535;
  height: 30px;
`
const Title = styled.div`
  grid-area: tit;
  > p {
    margin-bottom: 8px;
  }
`
const Thum = styled.div`
  grid-area: thu;
  > p {
    margin-bottom: 8px;
  }
`
const Description = styled.div`
  grid-area: des;
  > p {
    margin-bottom: 8px;
  }
`
const ImageList = styled.ul`
  grid-area: img;
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  ${tab`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}
  > .add {
    > p {
      font-size: 1.2rem;
      white-space: nowrap;
    }
    > button {
      margin-top: 8px;
    }
  }
  > .plus {
    position: relative;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 25px;
    max-width: 324px;
    padding-top: 100%;
    &:hover {
      background-color: rgb(46, 50, 52);
    }
    > svg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 4.2rem;
    }
  }
`
const Submit = styled.div`
  grid-area: sub;
`
const Foo = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`
/* ------------------------------------------------- */

const Upload: React.VFC = () => {
  const {} = useAuthChecker()
  const { newPost } = useMutatePost()
  const { required } = useValidate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thum, setThum] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [previewThum, setPreviewThum] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [cropThum, setCropThum] = useState<string | null>(null)

  const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const isBlank = required(previewThum, title, description, previewImages)
    if (isBlank) {
      alert('全ての項目を入力してください。')
      return false
    } else {
      const payload = {
        thum: thum,
        title: title,
        description: description,
        images: images,
      }
      await newPost(payload)
      setTitle('')
      setDescription('')
      setThum(null)
      setPreviewThum(null)
      setImages([])
      setPreviewImages([])
      setCropThum(null)
    }
  }

  const thumInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setThum(file)
    /* ---- preview ----- */
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewThum(reader.result as string)
      setCropThum(reader.result as string)
    }
    e.target.files = null
  }

  const imageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setImages((prevState) => [...prevState, file])
    /* ---- preview ----- */
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewImages((prevState) => [...prevState, reader.result as string])
    }
    e.target.value = null
  }

  const deletePreviewImage = (index: number) => {
    const targetImage = images[index]
    const newImages = images.filter((image) => image !== targetImage)
    const newPreviewImages = previewImages
    newPreviewImages.splice(index, 1)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  const clear = () => {
    setTitle('')
    setDescription('')
    setThum(null)
    setPreviewThum(null)
    setImages([])
    setPreviewImages([])
    setCropThum(null)
  }

  return (
    <Layout title={'Sintaku - New'}>
      <Container>
        <Wrapper>
          <Header>
            <h2> {title ? title : '新規投稿'}</h2>
          </Header>
          <Title>
            <Frame title={'タイトル(必須)'}>
              <Input
                value={title}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </Frame>
          </Title>
          <Description>
            <Frame title={'詳細(必須)'}>
              <TextArea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            </Frame>
          </Description>
          <ImageList>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={imageInputHandler}
            />
            {previewImages.length === 0 && (
              <div className="add">
                <p>JPEG GIF PNG</p>
                <p>1枚10MB以内、最大5枚アップロードできます。</p>
                <Button
                  sType="color"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    document.getElementById('imageInput').click()
                  }}
                >
                  ファイルを選択
                </Button>
              </div>
            )}
            {previewImages!.map((previewImage, index) => (
              <li key={index}>
                <PreviewImage
                  onclick={() => deletePreviewImage(index)}
                  src={previewImage}
                  index={index + 1}
                />
              </li>
            ))}
            {previewImages.length > 0 && previewImages.length < 5 && (
              <li
                className="plus"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()
                  document.getElementById('imageInput').click()
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            )}
          </ImageList>
          <Thum>
            <Frame title={'サムネイル(必須)'}>
              <PreviewThum src={cropThum} onChange={thumInputHandler} />
            </Frame>
          </Thum>
          <Submit>
            <Frame title={'公開'}>
              <Foo>
                <Button sType="color" onClick={submitHandler}>
                  投稿する
                </Button>
                <Button type="button" onClick={clear}>
                  キャンセル
                </Button>
              </Foo>
            </Frame>
          </Submit>
        </Wrapper>
      </Container>
      <Crop
        setCropThum={setCropThum}
        previewThum={previewThum}
        setThum={setThum}
      />
    </Layout>
  )
}
export default Upload
