const cardQueries = {
  // ... other queries ...

  checkCategory: `
    SELECT id, name 
    FROM categories 
    WHERE id = ?
  `,

  insert: `
    INSERT INTO cards (
      name, description, category_id, creator_name, 
      download_url, preview_url, markdown_content, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  
  // ... other queries ...
};

module.exports = {
  cardQueries
};