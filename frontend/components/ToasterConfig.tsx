import { Toaster } from 'react-hot-toast';

export function ToasterConfig() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        className: 'text-sm',
        style: {
          maxWidth: '500px',
          padding: '12px 24px',
        },
        success: {
          style: {
            background: '#10B981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        },
      }}
    />
  );
}