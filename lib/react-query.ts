import { QueryClient, DefaultOptions } from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
