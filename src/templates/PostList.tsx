import React from 'react'
import styled from 'styled-components'
import { PostMemo } from '../templates/index'
import { Loading, Button, Spacer } from '../components/index'
import { useQueryPosts } from '../hooks/useQueryPost'
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
const More = styled.div`
  text-align: center;
`
/* ------------------------------------------------- */

const PostList: React.VFC = () => {
  const { data, hasNextPage, fetchNextPage, isLoading } = useQueryPosts()

  if (isLoading) return <Loading isShow={true} />
  return (
    <Container>
      <Wrapper>
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((result) => (
              <li key={result.id}>
                <PostMemo {...result} />
              </li>
            ))}
          </React.Fragment>
        ))}
      </Wrapper>
      <Spacer axis="vertical" size={50} />
      <More>
        {!hasNextPage ||
          (!isLoading && (
            <>
              <Button
                type="button"
                sType="color"
                onClick={() => fetchNextPage()}
              >
                もっと見る
              </Button>
              <Spacer axis="vertical" size={50} />
            </>
          ))}
      </More>
    </Container>
  )
}
export default PostList
