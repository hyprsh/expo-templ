import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import tw, { useDeviceContext } from "@/lib/twrnc";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useDeviceContext(tw);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
