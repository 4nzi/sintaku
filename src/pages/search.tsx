import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PostMemo, Layout } from '../templates/index'
import { useQuerySearchPost } from '../hooks/useQuerySearchPost'
import { Loading, Spacer, NoResults } from '../components/index'
import { useAuthChecker } from '../hooks/useAuthChecker'
import { useRouter } from 'next/router'
import { tab } from '../media'

/* --------------------- Style --------------------- */
const Container = styled.div`
  margin: 32px 72px;
  ${tab`
   margin: 32px 20px;
    `}
`
const Wrapper = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 36px;
  ${tab`
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    `}
`
/* ------------------------------------------------- */

const Search: React.VFC = () => {
  const {} = useAuthChecker()
  const router = useRouter()
  const [urlQuery, setUrlQuery] = useState(null)

  useEffect(() => {
    const { keyword } = router.query
    setUrlQuery(keyword)
  }, [router.query])

  const { data, status } = useQuerySearchPost(urlQuery)

  if (status === 'loading')
    return (
      <Layout title={'Sintaku - search'}>
        <Loading isShow={true} />
      </Layout>
    )
  return (
    <Layout title={'Sintaku - search'}>
      <Container>
        {data.data.count === 0 && <NoResults />}
        <Wrapper>
          {data.data.results.map((result) => (
            <li key={result.id}>
              <PostMemo {...result} />
            </li>
          ))}
        </Wrapper>
        <Spacer axis="vertical" size={70} />
      </Container>
    </Layout>
  )
}
export default Search
