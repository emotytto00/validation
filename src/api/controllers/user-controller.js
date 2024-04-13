import db from '../../db.js';

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, username, email, role, password } = req.body;
  db.query('UPDATE users SET name = ?, username = ?, email = ?, role = ?, password = ? WHERE user_id = ?', [name, username, email, role, password, userId], (error, results) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    db.query('DELETE FROM cats WHERE owner = ?', [userId], (error, catResults) => {
      if (error) {
        console.error('Error deleting cats of user:', error);
        db.rollback(() => {
          res.status(500).json({ error: 'Internal Server Error' });
        });
        return;
      }
      db.query('DELETE FROM users WHERE user_id = ?', [userId], (error, userResults) => {
        if (error) {
          console.error('Error deleting user:', error);
          db.rollback(() => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
          return;
        }
        if (userResults.affectedRows === 0) {
          db.rollback(() => {
            res.status(404).json({ message: 'User not found' });
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
          res.json({ message: 'User deleted successfully' });
        });
      });
    });
  });
};

export { updateUser, deleteUser };
