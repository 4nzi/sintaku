import styled from 'styled-components'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Input, Label, Button } from '../components/index'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectMyProfile } from '../RTK/authSlice'
import { useAuthChecker } from '../hooks/useAuthChecker'

/* --------------------- Style --------------------- */
const Contaier = styled.div`
  margin: 0 auto;
  max-width: 474px;
  height: 377px;
  padding: 0 20px 0 20px;
  > h1 {
    text-align: center;
    padding-bottom: 11.5px;
    margin: 50px 0 25px;
    font-size: 3.2rem;
  }
`
const Wrapper = styled.form`
  padding: 20px;
  background-color: #222;
  > .name {
    margin-bottom: 15px;
  }
  > .password {
    margin-bottom: 30px;
  }
  > .submit {
    text-align: center;
    margin-bottom: 20px;
  }
  > a {
    color: #13aff0;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.15s ease;
    &:hover {
      color: #1083b4;
    }
  }
`
/* ------------------------------------------------- */

const SignIn: React.VFC = () => {
  const {} = useAuthChecker()
  const router = useRouter()
  const { nickName } = useSelector(selectMyProfile)
  const {
    email,
    password,
    emailChangeHandler,
    passChangeHandler,
    signinSubmitHandler,
  } = useAuth()

  useEffect(() => {
    if (nickName) {
      router.push('/')
    }
  }, [nickName, router])

  return (
    <Contaier>
      <h1>ログイン</h1>
      <Wrapper onSubmit={signinSubmitHandler}>
        <div className="name">
          <Label>メールアドレス</Label>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={emailChangeHandler}
            required
          />
        </div>
        <div className="password">
          <Label>パスワード</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={passChangeHandler}
            required
          />
        </div>
        <div className="submit">
          <Button sType="box" type="submit">
            ログイン
          </Button>
        </div>
        <Link href="/signup">
          <a>新規登録はこちら</a>
        </Link>
      </Wrapper>
    </Contaier>
  )
}
export default SignIn
