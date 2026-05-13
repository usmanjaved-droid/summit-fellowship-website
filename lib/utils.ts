// Format date string to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format time string to readable format
export function formatTime(timeString: string): string {
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Filter array by search term across multiple fields
export function filterBySearch<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      if (Array.isArray(value)) {
        return value.some((v: any) =>
          String(v).toLowerCase().includes(lowerSearchTerm)
        );
      }
      return false;
    })
  );
}

// Filter array by category
export function filterByCategory<T extends Record<string, any>>(
  items: T[],
  category: string,
  categoryField: keyof T = 'category' as keyof T
): T[] {
  if (!category) {
    return items;
  }

  return items.filter((item) => {
    const itemCategory = item[categoryField];
    if (Array.isArray(itemCategory)) {
      return itemCategory.includes(category);
    }
    return itemCategory === category;
  });
}
