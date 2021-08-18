import { Layout, PostList } from '../templates/index'
import { useAuthChecker } from '../hooks/useAuthChecker'

export default function Home() {
  const {} = useAuthChecker()

  return (
    <>
      <Layout title={'Sintaku'}>
        <PostList />
      </Layout>
    </>
  )
}
