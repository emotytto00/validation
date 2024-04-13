import db from '../../db.js';

// PUT update cat
const updateCat = (req, res) => {
  const catId = req.params.id;
  const { cat_name, owner } = req.body;
  db.query('UPDATE cats SET cat_name = ?, owner = ? WHERE cat_id = ?', [cat_name, owner, catId], (error, results) => {
    if (error) {
      console.error('Error updating cat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Cat not found' });
    } else {
      res.json({ message: 'Cat updated successfully' });
    }
  });
};

// DELETE cat
const deleteCat = (req, res) => {
  const catId = req.params.id;
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    db.query('DELETE FROM cats WHERE cat_id = ?', [catId], (error, results) => {
      if (error) {
        console.error('Error deleting cat:', error);
        db.rollback(() => {
          res.status(500).json({ error: 'Internal Server Error' });
        });
        return;
      }
      if (results.affectedRows === 0) {
        db.rollback(() => {
          res.status(404).json({ message: 'Cat not found' });
        });
        return;
      }
      db.commit((err) => {
        if (err) {
          console.error('Error committing transaction:', err);
          db.rollback(() => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
          return;
        }
        res.json({ message: 'Cat deleted successfully' });
      });
    });
  });
};

export { updateCat, deleteCat };
