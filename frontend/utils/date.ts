export function formatDate(timestamp: string | number): string {
  // Convert Unix timestamp (seconds) to milliseconds if needed
  const date = typeof timestamp === 'number' 
    ? new Date(timestamp * 1000)  // Convert seconds to milliseconds
    : new Date(timestamp);
    
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}