import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Layout, Comment } from '../../templates/index'
import { Loading, Avatar, Spacer } from '../../components/index'
import { POST } from '../../types'
import { GetStaticProps, GetStaticPaths } from 'next' //type
import { useAuthChecker } from '../../hooks/useAuthChecker'
import { getAllPostIds, getPost } from '../../hooks/useQueryPost'
import { useQueryProfs } from '../../hooks/useQueryProf'
import { pc, tab } from '../../media'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  display: grid;
  grid-template:
    'main side'
    /1fr 365px;
  ${tab`
    grid-template:
      "main  "
      "side  ";
  `}
`
const Main = styled.ul`
  grid-area: main;
  text-align: center;
  flex: 1;
  > li {
    > img {
      max-width: 100%;
      max-height: calc(100vh - 100px);
    }
  }
`
const Side = styled.aside`
  grid-area: side;
  overflow-y: auto;
  padding: 20px;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  ${pc`
    position: fixed;
    right: 0;
    width: 365px;
  `}
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > h2 {
    font-size: 2.2rem;
  }
`
const Title = styled.div`
  > h1 {
    font-size: 2.4rem;
  }
`
/* ------------------------------------------------- */

const PostDetail: React.VFC<POST> = ({
  title,
  images,
  description,
  created_at,
  userPost,
}) => {
  const router = useRouter()
  const {} = useAuthChecker()
  const { data } = useQueryProfs()

  const postUser = data?.find((prof) => {
    return prof.userProfile === userPost
  })

  if (router.isFallback || !title) {
    return <Loading isShow={true} />
  }

  return (
    <Layout title={'Sintaku' + ' - ' + title}>
      <Wrapper>
        <Main>
          {images.map((image, i) => (
            <li key={i}>
              <img src={image.file} alt="" />
              <Spacer axis="vertical" size={20} />
            </li>
          ))}
        </Main>
        <Side>
          <Header>
            <Avatar img={postUser?.img} size={50} />
            <h2>{postUser?.nickName}</h2>
          </Header>
          <Title>
            <h1>{title}</h1>
            <Spacer axis="vertical" size={10} />
            <p>{description}</p>
            <Spacer axis="vertical" size={20} />
            <small> {created_at}</small>
          </Title>
          <Comment />
          <Spacer axis="vertical" size={20} />
        </Side>
      </Wrapper>
    </Layout>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPost(ctx.params.id as string)

  return {
    props: { ...post },
    revalidate: 10, //ISR
  }
}
