import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

import { ReactElement, ReactNode } from 'react';

/**
 * Crea un QueryClient configurado para testing
 * Desactiva reintentos para hacer los tests más predecibles
 * @returns QueryClient configurado para testing
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

const AllTheProviders = ({
  children,
  queryClient = createTestQueryClient(),
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

/**
 * Función de renderizado personalizada para tests
 * Incluye todos los providers necesarios (QueryClient, ThemeProvider)
 * @param ui - Componente React a renderizar
 * @param options - Opciones de renderizado personalizadas
 * @returns Resultado del renderizado con providers
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { queryClient, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
