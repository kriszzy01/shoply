import * as React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClientProvider } from "react-query";

import { Button } from "@/components/Elements/Button";
import { Notifications } from "@/components/Elements/Notifications";

import { store } from "@/slices";
import { queryClient } from "@/lib/react-query";

const ErrorFallback = ({ error }: FallbackProps) => {
  const handleReset = () => window.location.assign(window.location.origin);

  return (
    <div role="alert">
      <h2 style={{ marginBottom: "1rem" }}>Ooops, something went wrong :( </h2>
      <pre>{error.message}</pre>
      <Button onClick={handleReset} />
    </div>
  );
};

const persistor = persistStore(store);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Notifications />
            {children}
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
