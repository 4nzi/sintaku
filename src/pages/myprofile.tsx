import styled from 'styled-components'
import { useState } from 'react'
import {
  Layout,
  MyPostList,
  NavBar,
  EditProfile,
  MyLikeList,
} from '../templates/index'
import { AvatarMemo, Spacer, Button } from '../components/index'
import { useSelector } from 'react-redux'
import { selectMyProfile } from '../RTK/authSlice'
import { useAuthChecker } from '../hooks/useAuthChecker'
import { useAuth } from '../hooks/useAuth'

/* --------------------- Style --------------------- */
const Hero = styled.div`
  height: 340px;
  background-color: #3a3a3a;
`
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  > h1 {
    font-size: 3.2rem;
  }
`
/* ------------------------------------------------- */

const Myprofile: React.VFC = () => {
  const {} = useAuthChecker()
  const data = useSelector(selectMyProfile)
  const { signoutSubmitHandler } = useAuth()
  const [tab, setTab] = useState('works')

  function Tabs() {
    if (tab === 'works') {
      return <MyPostList />
    } else if (tab === 'profile') {
      return <EditProfile />
    } else {
      return <MyLikeList />
    }
  }

  return (
    <>
      <Layout title={'Sintaku' + ' - ' + data?.nickName}>
        <Hero>
          <Wrapper>
            <Spacer axis="vertical" size={50} />
            <AvatarMemo img={data?.img} size={120} />
            <h1>{data?.nickName}</h1>
            <Button sType="box" onClick={signoutSubmitHandler}>
              ログアウト
            </Button>
          </Wrapper>
        </Hero>
        <NavBar tab={tab} setTab={setTab} />
        <Spacer axis="vertical" size={32} />
        <Tabs />
        <Spacer axis="vertical" size={20} />
      </Layout>
    </>
  )
}
export default Myprofile
