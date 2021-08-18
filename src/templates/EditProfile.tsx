import styled from 'styled-components'
import { useState } from 'react'
import { Input, Label, Spacer, Avatar, Button } from '../components/index'
import { Loading } from '../components/index'
import { useQueryMyProf } from '../hooks/useQueryProf'
import { useMutateProf } from '../hooks/useMutateProf'

/* --------------------- Style --------------------- */
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
`
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  > .avater {
    > div {
      padding: 20px;
      text-align: center;
      background-color: #292929;
      border: 1px solid #3f3f3f;
      border-radius: 2px;
    }
  }
  > .submit {
    text-align: center;
  }
`
/* ------------------------------------------------- */

const EditProfile: React.VFC = () => {
  const { data, status } = useQueryMyProf()
  const { updateProf } = useMutateProf()
  const [image, setImage] = useState<File | null>(null)
  const [previewimage, setPreviewimage] = useState<string | null>(null)
  const [nickName, setNickName] = useState('')

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const packet = { id: data.id, nickName: nickName, img: image }
    await updateProf(packet)
    setImage(null)
    setPreviewimage(null)
  }

  const imageChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setImage(file)
    /* ---- preview ----- */
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewimage(reader.result as string)
    }
    e.target.files = null
  }

  if (status === 'loading') return <Loading isShow={true} />
  return (
    <Container>
      <Wrapper onSubmit={submitHandler}>
        <div className="name">
          <Label>ユーザーネーム</Label>
          <Input
            value={nickName}
            placeholder={data.nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="avater">
          <Label>アバター画像</Label>
          <div>
            <Avatar
              size={100}
              img={previewimage ? previewimage : data.img}
            />
            <Spacer axis="vertical" size={15} />
            <Button
              sType="box"
              type="button"
              onClick={() => {
                document.getElementById('avaterInput').click()
              }}
            >
              ファイルを選択
            </Button>
            <input
              id="avaterInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={imageChangeHandler}
            />
          </div>
        </div>
        <div className="submit">
          <Button sType="box" type="submit">
            保存
          </Button>
        </div>
      </Wrapper>
    </Container>
  )
}
export default EditProfile
