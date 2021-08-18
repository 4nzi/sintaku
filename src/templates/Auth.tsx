import styled from 'styled-components'
import { Input, Label, Button } from '../components/index'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import {
  selectOpenSignIn,
  selectOpenSignUp,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
} from '../RTK/uiSlice'

/* --------------------- Style --------------------- */
const Wrapper = styled.form`
  padding: 20px;
  > h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
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
  > span {
    color: #13aff0;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.15s ease;
    &:hover {
      color: #1083b4;
    }
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  border-bottom: 1px solid #333;
  padding: 15px 20px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  > h1 {
    font-size: 1.8rem;
  }
`
const modalStyle = {
  overlay: {
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '500px',
    margin: '30px auto',
    bottom: 'auto',
    backgroundColor: '#222',
    border: 'none',
    padding: 'none',
    transform: 'translate(0, 0)',
  },
}
/* ------------------------------------------------- */

const Auth: React.VFC = () => {
  Modal.setAppElement('#__next')
  const dispatch = useDispatch()
  const {
    email,
    password,
    emailChangeHandler,
    passChangeHandler,
    signupSubmitHandler,
    signinSubmitHandler,
  } = useAuth()
  const openSignIn = useSelector(selectOpenSignIn)
  const openSignUp = useSelector(selectOpenSignUp)
  return (
    <>
      <Modal
        isOpen={openSignUp}
        onRequestClose={() => {
          dispatch(resetOpenSignUp())
        }}
        style={modalStyle}
      >
        <Header>
          <h1>新規登録</h1>
        </Header>
        <Wrapper onSubmit={signupSubmitHandler}>
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
            <Button type="submit" sType="box">
              新規登録
            </Button>
          </div>
          <span
            onClick={() => {
              dispatch(setOpenSignIn())
              dispatch(resetOpenSignUp())
            }}
          >
            ログインはこちら
          </span>
        </Wrapper>
      </Modal>
      <Modal
        isOpen={openSignIn}
        onRequestClose={() => {
          dispatch(resetOpenSignIn())
        }}
        style={modalStyle}
      >
        <Header>
          <h1>ログイン</h1>
        </Header>
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
            <Button type="submit" sType="box">
              ログイン
            </Button>
          </div>
          <span
            onClick={() => {
              dispatch(setOpenSignUp())
              dispatch(resetOpenSignIn())
            }}
          >
            新規登録はこちら
          </span>
        </Wrapper>
      </Modal>
    </>
  )
}
export default Auth
