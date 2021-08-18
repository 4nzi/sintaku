import styled from 'styled-components'
import { useState } from 'react'
import {
  Layout,
  MyPostList,
  NavBar,
  EditProfile,
  MyLikeList,
} from '../templates/index'
import { Avatar, Spacer, Button } from '../components/index'
import { useAuthChecker } from '../hooks/useAuthChecker'
import { useQueryMyProf } from '../hooks/useQueryProf'
import { useMutateAuth } from '../hooks/useMutateAuth'

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
  const { data } = useQueryMyProf()
  const { signout } = useMutateAuth()
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
            <Avatar img={data?.img} size={120} />
            <h1>{data?.nickName}</h1>
            <Button sType="box" onClick={signout}>
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
