import { AppProps } from 'next/app'
import GlobalStyle from '../components/GlobalStyle'
import { Provider } from 'react-redux'
import { store } from '../RTK/store'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
        <GlobalStyle />
      </Provider>
    </QueryClientProvider>
  )
}
export default MyApp
