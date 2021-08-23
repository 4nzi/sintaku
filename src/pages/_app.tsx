import { AppProps } from 'next/app'
import GlobalStyle from '../components/GlobalStyle'
import { store } from '../RTK/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

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
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Component {...pageProps} />
          <GlobalStyle />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default MyApp
